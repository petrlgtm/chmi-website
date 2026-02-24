const WEB3FORMS_URL = "https://api.web3forms.com/submit";

export type FormType = "contact" | "prayer" | "newsletter" | "eventReg";

const SUBJECT_MAP: Record<FormType, string> = {
  contact: "New Contact Message — Christ's Heart Ministries",
  prayer: "New Prayer Request — Christ's Heart Ministries",
  newsletter: "New Newsletter Subscription — Christ's Heart Ministries",
  eventReg: "New Event Registration — Christ's Heart Ministries",
};

export async function submitWeb3Form(
  formType: FormType,
  data: Record<string, unknown>,
): Promise<{ ok: boolean; error?: string }> {
  const accessKey = import.meta.env.VITE_WEB3FORMS_KEY as string | undefined;

  if (!accessKey || accessKey === "xplaceholder") {
    console.warn(`Web3Forms key not configured — "${formType}" submission skipped`);
    return { ok: true };
  }

  try {
    const res = await fetch(WEB3FORMS_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json", Accept: "application/json" },
      body: JSON.stringify({
        access_key: accessKey,
        subject: SUBJECT_MAP[formType],
        from_name: "Christ's Heart Website",
        botcheck: "",
        ...data,
      }),
    });

    const body = (await res.json().catch(() => ({}))) as {
      success?: boolean;
      message?: string;
    };

    if (!res.ok || !body.success) {
      return { ok: false, error: body.message || res.statusText };
    }

    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : "Network error",
    };
  }
}
