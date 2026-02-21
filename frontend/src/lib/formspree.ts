const FORMSPREE_BASE = "https://formspree.io/f/";

export type FormspreeFormId = "contact" | "prayer" | "newsletter" | "eventReg";

const FORM_IDS: Record<FormspreeFormId, string> = {
  contact: import.meta.env.VITE_FORMSPREE_CONTACT || "xplaceholder",
  prayer: import.meta.env.VITE_FORMSPREE_PRAYER || "xplaceholder",
  newsletter: import.meta.env.VITE_FORMSPREE_NEWSLETTER || "xplaceholder",
  eventReg: import.meta.env.VITE_FORMSPREE_EVENT_REG || "xplaceholder",
};

export async function submitFormspree(
  formId: FormspreeFormId,
  data: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  const id = FORM_IDS[formId];
  if (!id || id === "xplaceholder") {
    console.warn(`Formspree form "${formId}" not configured — submission skipped`);
    return { ok: true };
  }

  try {
    const res = await fetch(`${FORMSPREE_BASE}${id}`, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      return { ok: false, error: (body as Record<string, string>).error || res.statusText };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
