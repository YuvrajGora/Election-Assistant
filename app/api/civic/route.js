import { NextResponse } from "next/dist/server/web/spec-extension/response";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get('address');

  if (!address) {
    return NextResponse.json({ error: "Address is required" }, { status: 400 });
  }

  const apiKey = process.env.GOOGLE_CIVIC_API_KEY;

  if (!apiKey) {
    console.warn("GOOGLE_CIVIC_API_KEY is not set. Returning mock data.");
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Return realistic mock data for demonstration
    return NextResponse.json({
      normalizedInput: {
        line1: address,
        city: "Sample City",
        state: "CA",
        zip: "90210"
      },
      pollingLocations: [
        {
          address: {
            locationName: "Community Center (Mock Data)",
            line1: "123 Main St",
            city: "Sample City",
            state: "CA",
            zip: "90210"
          },
          pollingHours: "7:00 AM - 8:00 PM",
          notes: "Enter through the side door."
        }
      ],
      earlyVoteSites: [
        {
           address: {
            locationName: "City Hall (Mock Data)",
            line1: "456 Civic Plaza",
            city: "Sample City",
            state: "CA",
            zip: "90210"
          },
          pollingHours: "Mon-Fri 9:00 AM - 5:00 PM",
          startDate: "2024-10-15",
          endDate: "2024-11-04"
        }
      ],
      contests: [
        {
          type: "General",
          office: "President of the United States",
          district: { name: "United States", scope: "national" }
        },
        {
          type: "General",
          office: "U.S. Senate",
          district: { name: "California", scope: "statewide" }
        }
      ]
    });
  }

  try {
    // Call the actual Google Civic Information API
    // We use voterInfoQuery to get polling locations and contests
    const url = new URL('https://www.googleapis.com/civicinfo/v2/voterinfo');
    url.searchParams.append('key', apiKey);
    url.searchParams.append('address', address);
    url.searchParams.append('electionId', '2000'); // 2000 is the VIP Test Election, or use actual ID

    const response = await fetch(url.toString());
    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || "Failed to fetch civic data");
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("Civic API Error:", error);
    return NextResponse.json(
      { error: "Failed to fetch polling information." },
      { status: 500 }
    );
  }
}
