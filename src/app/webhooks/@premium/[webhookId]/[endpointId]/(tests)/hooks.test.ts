// import { renderHook, act, waitFor } from "@testing-library/react";
// import { useWebhookInterface } from "./hooks";

// describe("useWebhookInterface", () => {
//   it("should handle endpoint creation", async () => {
//     const { result } = renderHook(() => useWebhookInterface());

//     // Mock endpointFormValues and endpointPayload
//     act(() => {
//       result.current.getEndpointInfo({
//         name: "name",
//         description: "Test description",
//         webhookId: "test-webhook-id",
//       });
//     });

//     // Wait for useEffect to run
//     await waitFor(() => expect(result.current.loading).toBe(false));

//     // Check that loading state is updated correctly
//     expect(result.current.loading).toBe(false);

//     // Check that createState is updated correctly
//     expect(result.current.createState).toEqual({
//       state: "Endpoint Created!",
//       active: false,
//     });
//   });

//   it("should handle validation error", async () => {
//     const { result } = renderHook(() => useWebhookInterface());

//     // Mock endpointFormValues and endpointPayload with invalid description
//     act(() => {
//       result.current.getEndpointInfo({
//         name: "name",
//         description: "Invalid description",
//         webhookId: "test-webhook-id",
//       });
//     });

//     // Wait for useEffect to run
//     await waitFor(() => expect(result.current.loading).toBe(false));

//     // Check that createState is updated correctly
//     expect(result.current.createState).toEqual({
//       state: "Create Endpoint",
//       active: true,
//     });
//   });
// });
