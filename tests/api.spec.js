import { expect, test } from "@playwright/test";

const token =
  "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJiaXRjYXN0bGUuaW8iLCJkZXZpY2UiOiIyNDM0IiwidWlkIjoiNDI0NTIiLCJzY29wZXMiOiJhbGwiLCJpYXQiOjE3NDQ3MTE0MTcsImV4cCI6MTc0NDcxNTAxN30.dtJR9290sYbiFnNR51M_vBV1K98pRtWnQo4wkH8krpQhGm4C7vCN4p5KNx_DxJck8ZnEN-NNz4U6glPTbdIp_rCQCCBLPUcbpqkDyeSeEnIHSe2_aA9SdgX0ZdTTEr8f_6Tis5uvzhaIyQCvqScZ-09NyMcuGAmbfbAMumCwsFjZyhjVshSXyhxtWmmJbyrT6r2DXFuMdqPTTFmFa0fXtoDBEgEHBwo7T-lLXIc4bNRbVH3wS8IElPSiWb6Kl_S-_Uo2_PvS84wZjHr0RqzyVkPC2eh5Hd2g9ok6MGSEMXT17j9mVvM0F20svGhZLgyfLUIk4Btn9iExFr-UJQvZ7Esm342yclPozvEEz7YTvPIPiYCYsFVY2N9d8xMtMii40ZfkoYDMHVUaLugDfGUsJoOyQKkFh89wxQ1_dkL-9DFW_fm9UhPz5Xe_1UamcmsNesTvKrNaBkzf3x0Coklvfu5XnMXcrI4PSSymaQSRvJw-aj3WGaWhC2kLpSsrhrpwET-x5nvMvS4Hks8_keMoJNcPGAHEb8vx7xaXW6JKKHQ8ECpPILUTzYiBrC25SyqLTd_z7WyvnvP9nzxB6SaMda4ZU-PBRReCMtrUAiFY2NuCwsg2EROeUTrF2vI5ey-AYfK3UYvc4lCngPgDl4SNbd9bgcBFgKY56cOLIMFywhM";

test("validate order", async ({ request }) => {
  const res = await request.post(
    `/futures/v1/order`,
    {
      coin: "btc",
      currency: "usdt",
      side: 1,
      type: 2,
      mode: 1,
      amount_type: 1,
      amount: "1.2",
      price: "85899.2",
      leverage: 150,
      collateral: 1,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );

  const data = await res.json();
  if (!res.ok()) {
    console.log("Error response:", data);
    expect(data.msg).toBe("VALIDATION_ERROR");

    expect(data?.errors[0]?.msg).toBe("FUTURES.CREATE_ORDER.SIDE_REQUIRED");
    return;
  }
  console.log("Success response:", data);
});
