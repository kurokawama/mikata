import { ImageResponse } from "next/og";
import { type NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const title = searchParams.get("title") ?? "MIKATA - 多視点ニュース";

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#1B2A4A",
          padding: "40px",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            textAlign: "center",
            maxWidth: "900px",
          }}
        >
          <div
            style={{
              fontSize: 32,
              fontWeight: 700,
              color: "#FAFAF8",
              marginBottom: 20,
              display: "flex",
            }}
          >
            MI
            <span style={{ color: "#F59E0B" }}>KA</span>
            TA
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 700,
              color: "#FAFAF8",
              lineHeight: 1.3,
              display: "flex",
              textAlign: "center",
            }}
          >
            {title}
          </div>
          <div
            style={{
              fontSize: 18,
              color: "#8DA8D2",
              marginTop: 20,
              display: "flex",
            }}
          >
            多視点ニュース by AI分析
          </div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
