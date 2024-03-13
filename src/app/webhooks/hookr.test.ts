// import { renderHook, act, waitFor } from "@testing-library/react";
// import { useCreateWebhookApp } from "./hooks";

// // Mock the createWebhookUID function
// jest.mock("./createWebhookUID", () => ({
//   __esModule: true,
//   default: jest.fn(() => Promise.resolve("mockUid")),
// }));

// describe("useCreateWebhookApp", () => {
//   it("should update status and loading when getName is called", async () => {
//     const { result } = renderHook(() =>
//       useCreateWebhookApp({ uid: "testUid" }),
//     );

//     act(() => {
//       result.current.getName({ name: "testName" });
//     });

//     expect(result.current.status).toBe("Submitting");
//     expect(result.current.loading).toBe(true);
//   });

//   it("should validate webhookName and call createWebhookUID", async () => {
//     const { result } = renderHook(() =>
//       useCreateWebhookApp({ uid: "testUid" }),
//     );

//     act(() => {
//       result.current.getName({ name: "testName" });
//     });

//     await waitFor(() => expect(result.current.loading).toBe(false));

//     expect(result.current.status).toBe("Created");
//     expect(result.current.loading).toBe(false);
//   });
// });
