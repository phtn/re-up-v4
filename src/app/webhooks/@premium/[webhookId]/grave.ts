// const useGraveyard = ()=>{
//   const app_id = endpointFormValues?.webhookId;
//     const name = endpointFormValues?.name;

//   useEffect(() => {
//       const createEndpointPayload = async () => {
//         const uid = await createEndpointUID(
//           userId,
//           new Date().getTime().toString(36),
//         );
//         const defaults = {
//           rateLimit: 64,
//           disabled: false,
//           filterTypes: undefined,
//           channels: undefined,
//           metadata: {},
//         };

//         const description = endpointFormValues?.description;
//         const { rateLimit, disabled, filterTypes, channels, metadata } = defaults;
//         const url = `https://re-up.ph/${pathName}/${uid}`;
//         const payload: CreateEndpointSchema = mergeObjects({
//           description,
//           url,
//           uid,
//           rateLimit,
//           disabled,
//           filterTypes,
//           channels,
//           metadata,
//         });

//         setEndpointPayload(payload);

//         setCreateState({ state: "Creating ...", active: false });
//       };

//       if (endpointFormValues) {
//         createEndpointPayload()
//           .then(() => {
//             setLoading(false);
//           })
//           .catch((err: Error) => {
//             onError("Error creating endpoint", err.message);
//             setLoading(false);
//           });
//       }
//     }, [userId, pathName, endpointFormValues]);

//   /**
//      * @name handleCreateEndpoint
//      * @description main entry point for createEndpoint function
//      * @async
//      */
//     const handleCreateEndpoint = useCallback(
//       async (params: CreateEndpointParamsSchema) => {
//         const payload = await createEndpoint(params);
//         if (
//           name &&
//           userId &&
//           app_id &&
//           payload &&
//           (payload satisfies EndpointOut)
//         ) {
//           const postParams = { name, app_id, userId, payload };
//           const [message, statusCode] = await addEndpoint(postParams);
//           if (statusCode === 1) {
//             setCreateState({ state: "Endpoint Created!", active: false });
//             setLoading(false);
//             onSuccess(
//               "New Endpoint created!",
//               `The server says: ${String(message)}`,
//             );
//           }
//         }
//       },
//       [app_id, name, userId],
//     );

//     useEffect(() => {
//         if (endpointPayload && (endpointPayload satisfies EndpointIn)) {
//           console.log("payload ready");
//           const validInput = ValidInputFormat.safeParse(
//             endpointPayload.description,
//           );
//           if (!validInput.success) {
//             onValidationError("**description**");
//             setLoading(false);
//             setCreateState({ state: "Create Endpoint", active: true });
//           }

//           if (endpointPayload satisfies CreateEndpointSchema) {
//             // TODO: handle error
//             // use await instead of then

//             handleCreateEndpoint({ app_id: app_id!, resource: endpointPayload })
//               .then((response) => {
//                 onSuccess("Endpoint Created!");
//                 setLoading(false);
//                 setCreateState({ state: "Endpoint Created!", active: false });
//                 console.log(response);

//                 setLoading(false);
//                 setCreateState({ state: "Endpoint Created!", active: false });
//               })
//               .catch((err: Error) => {
//                 onError(err.name, err.message);
//               });
//           }
//         }
//       }, [endpointPayload, endpointFormValues, app_id, handleCreateEndpoint]);

//     useEffect(() => {
//         console.log("loading:", loading);
//         console.log("create:", createState);
//         console.log("valid:", typeof endpointPayload);
//       }, [loading, createState, endpointPayload, userId, pathName]);
// };
