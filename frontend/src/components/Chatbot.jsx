import { useContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { AppContext } from "../context/AppContext";

const welcomeMessage = {
  role: "assistant",
  content:
    "Hi! I can help you find a suitable doctor or guide you through booking an appointment. I can't diagnose or replace a medical professional.",
};

const quickPrompts = [
  "Help me choose a doctor",
  "How do I book an appointment?",
];

const Chatbot = () => {
  const { backendUrl, doctors } = useContext(AppContext);
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([welcomeMessage]);
  const [input, setInput] = useState("");
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isOpen]);

  const sendMessage = async (text = input) => {
    const content = text.trim();
    if (!content || isSending) return;

    const userMessage = { role: "user", content };
    const conversation = [...messages, userMessage];
    setMessages(conversation);
    setInput("");
    setIsSending(true);

    try {
      const { data } = await axios.post(`${backendUrl}/api/ai/chat`, {
        messages: conversation.slice(-10).map(({ role, content: message }) => ({
          role,
          content: message,
        })),
      });

      if (!data.success) {
        throw new Error(data.message || "The assistant could not respond.");
      }

      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: data.message,
          specialties: data.specialties,
        },
      ]);
    } catch (error) {
      const message =
        error.response?.status === 404
          ? "The chatbot endpoint is not available on the configured backend yet. Deploy or restart the backend with the /api/ai/chat route, then try again."
          : error.response?.data?.message ||
            error.message ||
            "The assistant could not respond. Please try again.";
      setMessages((currentMessages) => [
        ...currentMessages,
        {
          role: "assistant",
          content: `${message} You can also browse doctors directly.`,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  };

  const getSuggestedDoctors = (specialties = []) =>
    specialties.flatMap((speciality) =>
      doctors
        .filter((doctor) => doctor.speciality === speciality && doctor.available)
        .slice(0, 2),
    );

  return (
    <div className="fixed bottom-5 right-5 z-50">
      {isOpen && (
        <section
          aria-label="Prescripto assistant"
          className="mb-3 flex h-[min(34rem,calc(100dvh-7rem))] w-[min(24rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-blue-100 bg-white shadow-2xl"
        >
          <header className="flex items-center justify-between bg-primary px-4 py-3 text-white">
            <div>
              <h2 className="font-medium">Prescripto assistant</h2>
              <p className="text-xs text-white/80">
                Doctor suggestions and booking help
              </p>
            </div>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              aria-label="Close chat"
              className="rounded-full px-2 py-1 text-xl leading-none hover:bg-white/15"
            >
              ×
            </button>
          </header>

          <div
            aria-live="polite"
            className="flex-1 space-y-3 overflow-y-auto bg-slate-50 p-4"
          >
            <p className="rounded-lg border border-amber-200 bg-amber-50 p-2 text-xs leading-relaxed text-amber-900">
              Not for emergencies or diagnosis. Messages are sent to Google Gemini to
              generate guidance; avoid sharing your name or other identifying
              details.
            </p>
            {messages.map((message, index) => {
              const suggestedDoctors =
                message.role === "assistant"
                  ? getSuggestedDoctors(message.specialties)
                  : [];

              return (
                <div
                  key={`${message.role}-${index}`}
                  className={`max-w-[90%] whitespace-pre-wrap rounded-xl px-3 py-2 text-sm leading-relaxed ${
                    message.role === "user"
                      ? "ml-auto rounded-br-sm bg-primary text-white"
                      : "mr-auto rounded-bl-sm border border-gray-100 bg-white text-gray-700 shadow-sm"
                  }`}
                >
                  {message.content}
                  {suggestedDoctors.length > 0 && (
                    <div className="mt-3 space-y-2">
                      {suggestedDoctors.map((doctor) => (
                        <button
                          key={doctor._id}
                          type="button"
                          onClick={() => {
                            navigate(`/appointment/${doctor._id}`);
                            setIsOpen(false);
                          }}
                          className="flex w-full items-center gap-2 rounded-lg border border-blue-100 p-2 text-left hover:bg-blue-50"
                        >
                          <img
                            src={doctor.image}
                            alt=""
                            className="h-10 w-10 rounded-full object-cover"
                          />
                          <span className="min-w-0 flex-1">
                            <span className="block truncate font-medium text-gray-800">
                              {doctor.name}
                            </span>
                            <span className="block text-xs text-gray-500">
                              {doctor.speciality}
                            </span>
                          </span>
                          <span className="text-xs text-primary">View</span>
                        </button>
                      ))}
                    </div>
                  )}
                  {message.specialties?.length > 0 &&
                    suggestedDoctors.length === 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {message.specialties.map((speciality) => (
                          <button
                            key={speciality}
                            type="button"
                            onClick={() => {
                              navigate(
                                `/doctors/${encodeURIComponent(speciality)}`,
                              );
                              setIsOpen(false);
                            }}
                            className="rounded-full border border-primary px-3 py-1 text-xs text-primary hover:bg-blue-50"
                          >
                            Browse {speciality}
                          </button>
                        ))}
                      </div>
                    )}
                </div>
              );
            })}
            {isSending && (
              <p className="mr-auto rounded-xl bg-white px-3 py-2 text-sm text-gray-500 shadow-sm">
                Finding helpful guidance...
              </p>
            )}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div className="flex flex-wrap gap-2 border-t border-gray-100 bg-white px-3 pt-3">
              {quickPrompts.map((prompt) => (
                <button
                  key={prompt}
                  type="button"
                  onClick={() => sendMessage(prompt)}
                  disabled={isSending}
                  className="rounded-full border border-blue-100 px-3 py-1.5 text-xs text-gray-600 hover:bg-blue-50 disabled:opacity-50"
                >
                  {prompt}
                </button>
              ))}
            </div>
          )}

          <form
            onSubmit={(event) => {
              event.preventDefault();
              sendMessage();
            }}
            className="flex items-end gap-2 border-t border-gray-100 bg-white p-3"
          >
            <textarea
              value={input}
              onChange={(event) => setInput(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter" && !event.shiftKey) {
                  event.preventDefault();
                  sendMessage();
                }
              }}
              maxLength={1000}
              rows={1}
              aria-label="Describe your concern or ask about booking"
              placeholder="Describe your concern or ask a question..."
              className="max-h-24 min-h-10 flex-1 resize-y rounded-xl border border-gray-200 px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <button
              type="submit"
              disabled={!input.trim() || isSending}
              className="rounded-xl bg-primary px-4 py-2.5 text-sm font-medium text-white hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              Send
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        onClick={() => setIsOpen((open) => !open)}
        aria-label={isOpen ? "Close assistant" : "Open assistant"}
        aria-expanded={isOpen}
        className="ml-auto flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition hover:scale-105"
      >
        {isOpen ? (
          <span className="text-3xl leading-none">×</span>
        ) : (
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-7 w-7 fill-none stroke-current"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M7 18.5 3.5 21v-5A8.5 8.5 0 0 1 12 3.5h.5a8 8 0 0 1 0 16H7Z"
            />
            <path
              strokeLinecap="round"
              d="M8 11.5h.01M12 11.5h.01M16 11.5h.01"
            />
          </svg>
        )}
      </button>
    </div>
  );
};

export default Chatbot;
