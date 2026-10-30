const specialties = [
  "General physician",
  "Gynecologist",
  "Dermatologist",
  "Pediatricians",
  "Neurologist",
  "Gastroenterologist",
];

const systemPrompt = `You are Prescripto's appointment-navigation assistant, not a medical professional.
Help people understand which doctor specialty offered by this app may be a reasonable starting point: ${specialties.join(", ")}.
Never diagnose, claim certainty, prescribe medication, or tell someone to delay care. Be warm, concise, and cautious. For potentially urgent symptoms (including chest pain, severe trouble breathing, stroke symptoms, loss of consciousness, severe bleeding, or thoughts of self-harm), tell the person to contact local emergency services or seek emergency care now; do not suggest booking a routine appointment instead.
For account and appointment help, give these app-specific instructions:
- To book: browse or choose a doctor, select an available date and time, then book. Sign in is required.
- To view appointments: sign in, open the profile menu, and choose "My Appointments".
- To cancel: open "My Appointments" and choose "Cancel appointment" on an appointment that is not already cancelled or completed. Do not promise a refund.
- To pay online: open "My Appointments" and choose "Pay Online" for an unpaid appointment, then complete the Razorpay checkout. The appointment shows as paid after successful payment. Never ask for payment details in chat.
- To edit a profile: sign in, open the profile menu, choose "My Profile", select "Edit", update the available details, and choose "Save Information". Email is displayed but cannot be edited there.
Do not invent appointment availability, prices, refund policies, or clinic instructions.
Only recommend a specialty when the conversation gives enough context. Do not ask for names, contact details, or other identifying information. If symptoms are unclear, ask one short follow-up question or suggest discussing them with a general physician.
Respond only as a JSON object with exactly these properties: "message" (string) and "specialties" (array of strings). The array may contain only exact values from the provided specialty list, and should be empty when no specialty recommendation is appropriate.`;

const isValidConversation = (messages) =>
  Array.isArray(messages) &&
  messages.length > 0 &&
  messages.length <= 10 &&
  messages[messages.length - 1]?.role === "user" &&
  messages.every(
    (message) =>
      message &&
      ["user", "assistant"].includes(message.role) &&
      typeof message.content === "string" &&
      message.content.trim().length > 0 &&
      message.content.length <= 1000,
  );

export const chatWithAssistant = async (req, res) => {
  if (!process.env.GEMINI_API_KEY) {
    return res.status(503).json({
      success: false,
      message: "The assistant is not configured yet. Set GEMINI_API_KEY in backend/.env.",
    });
  }

  const { messages } = req.body ?? {};
  if (!isValidConversation(messages)) {
    return res.status(400).json({
      success: false,
      message: "Please send a valid chat message and try again.",
    });
  }

  const model = process.env.GEMINI_MODEL || "gemini-3.6-flash";
  let response;
  try {
    response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/${encodeURIComponent(model)}:generateContent`,
      {
        method: "POST",
        headers: {
          "x-goog-api-key": process.env.GEMINI_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: systemPrompt }],
          },
          contents: messages.map(({ role, content }) => ({
            role: role === "assistant" ? "model" : "user",
            parts: [{ text: content }],
          })),
          generationConfig: {
            responseMimeType: "application/json",
            maxOutputTokens: 500,
            temperature: 0.3,
          },
        }),
        signal: AbortSignal.timeout(20000),
      },
    );
  } catch (error) {
    console.error("Gemini chat request failed:", error.message);
    return res.status(502).json({
      success: false,
      message: "The assistant is temporarily unavailable. Please try again.",
    });
  }

  if (!response.ok) {
    console.error(`Gemini chat request returned status ${response.status}.`);
    let providerError;
    try {
      providerError = await response.json();
    } catch (error) {
      console.error("Could not read Gemini error response:", error.message);
    }

    const providerMessage = providerError?.error?.message || "";
    const providerStatus = providerError?.error?.status || "";
    if (response.status === 429) {
      const isQuotaError =
        providerStatus === "RESOURCE_EXHAUSTED" &&
        /quota|billing|limit: 0/i.test(providerMessage);
      return res.status(502).json({
        success: false,
        message: isQuotaError
          ? "The Gemini API quota is exhausted. Check your Google AI API billing and usage limits."
          : "The Gemini API rate limit was reached. Wait briefly before trying again.",
      });
    }

    const providerMessages = {
      400: /api.?key|api key/i.test(providerMessage)
        ? "Gemini rejected the API key. Check GEMINI_API_KEY in backend/.env."
        : "Gemini rejected the request. Check GEMINI_MODEL and try again.",
      401: "Gemini rejected the API key. Check GEMINI_API_KEY in backend/.env.",
      403: "The Gemini API key does not have permission to use this model.",
      404: "The configured Gemini model was not found. Check GEMINI_MODEL in backend/.env.",
    };
    return res.status(502).json({
      success: false,
      message:
        providerMessages[response.status] ||
        `The Gemini service returned an error (${response.status}). Please try again later.`,
    });
  }

  let result;
  try {
    result = await response.json();
  } catch (error) {
    console.error("Could not read Gemini chat response:", error.message);
    return res.status(502).json({
      success: false,
      message: "The assistant returned an invalid response. Please try again.",
    });
  }

  const content = result.candidates?.[0]?.content?.parts
    ?.map((part) => part.text || "")
    .join("")
    .trim();
  let assistantResponse;
  try {
    assistantResponse = JSON.parse(content);
  } catch (error) {
    console.error("Could not parse Gemini assistant response:", error.message);
    return res.status(502).json({
      success: false,
      message: "The assistant returned an invalid response. Please try again.",
    });
  }

  if (typeof assistantResponse.message !== "string") {
    console.error("Gemini assistant response is missing its message.");
    return res.status(502).json({
      success: false,
      message: "The assistant returned an invalid response. Please try again.",
    });
  }

  const recommendedSpecialties = Array.isArray(assistantResponse.specialties)
    ? assistantResponse.specialties.filter((specialty) =>
        specialties.includes(specialty),
      )
    : [];

  return res.json({
    success: true,
    message: assistantResponse.message,
    specialties: [...new Set(recommendedSpecialties)],
  });
};
