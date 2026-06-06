async function getVendor(
  id: string
) {

  const res = await fetch(
    `http://localhost:5000/vendors/id/${id}`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

async function getAnalytics(
  id: string
) {

  const res = await fetch(
    `http://localhost:5000/vendors/${id}/analytics`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

export default async function VendorAnalyticsPage({
  params,
}: {
  params: Promise<{
    id: string;
  }>;
}) {

  const { id } =
    await params;

  const vendor =
    await getVendor(id);

  const analytics =
    await getAnalytics(id);

    async function getEvents(
  id: string
) {

  const res = await fetch(
    `http://localhost:5000/vendors/${id}/events`,
    {
      cache: "no-store",
    }
  );

  return res.json();

}

const events =
  await getEvents(id);

  return (

    <div
      style={{
        padding: "20px",
      }}
    >

      <h1>
        Analytics
      </h1>

      <h2>
        {vendor.name}
      </h2>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(4, 1fr)",
          gap: "20px",
          marginTop: "30px",
        }}
      >

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            👀
          </h2>

          <h3>
            {analytics.views}
          </h3>

          <p>
            Views
          </p>

        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            📞
          </h2>

          <h3>
            {analytics.callClicks}
          </h3>

          <p>
            Calls
          </p>

        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            💬
          </h2>

          <h3>
            {analytics.whatsappClicks}
          </h3>

          <p>
            WhatsApp
          </p>

        </div>

        <div
          style={{
            border: "1px solid #ddd",
            padding: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>
            📍
          </h2>

          <h3>
            {analytics.mapClicks}
          </h3>

          <p>
            Maps
          </p>

        </div>

      </div>
<h2>
  Recent Activity
</h2>
{events.map((event: any) => (

  <div
    key={event.id}
    style={{
      borderBottom:
        "1px solid #eee",
      padding: "10px 0",
    }}
  >

    <strong>
      {event.eventType}
    </strong>

    <p>
      {
        new Date(
          event.createdAt
        ).toLocaleString()
      }
    </p>

  </div>

))}

    </div>

  );

}