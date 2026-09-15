import { NextRequest, NextResponse } from "next/server";
import { performArchitectReview } from "@/lib/ai";

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { repoOrConcept, brandScope, focusArea, simulateChaos } = body;

    if (!repoOrConcept || typeof repoOrConcept !== "string") {
      return NextResponse.json(
        { error: "repoOrConcept string is required" },
        { status: 400 }
      );
    }

    const review = await performArchitectReview({
      repoOrConcept: repoOrConcept.trim(),
      brandScope: brandScope || "Cross-Brand Portfolio",
      focusArea: focusArea || "REDUNDANCY_AUDIT",
      simulateChaos: Boolean(simulateChaos),
    });

    return NextResponse.json(review);
  } catch (err: unknown) {
    console.error("API /api/ai/architect-review error:", err);
    return NextResponse.json(
      { error: "Internal server error during architectural review" },
      { status: 500 }
    );
  }
}
