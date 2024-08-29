import { type NextRequest, NextResponse } from "next/server";

// Define a type for your expected webhook payload
interface WebhookPayload {
  // Add the properties you expect in your webhook payload
  // For example:
  event: string;
  data: {
    id: string;
    // ... other fields
  };
  // ... other top-level fields
}

export async function POST(request: NextRequest): Promise<NextResponse> {
  try {
    // Parse the incoming JSON body with type assertion
    const body = (await request.json()) as WebhookPayload;

    // Process the webhook data
    console.log("Received webhook:", body);

    // Here, you would typically add your webhook processing logic
    // For example, updating a database, triggering an event, etc.

    // Return a success response
    return NextResponse.json(
      { message: "Webhook received successfully" },
      { status: 200 },
    );
  } catch (error) {
    console.error("Error processing webhook:", error);
    return NextResponse.json(
      { error: "Error processing webhook" },
      { status: 500 },
    );
  }
}
