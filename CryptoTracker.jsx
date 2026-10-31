import { useQuery } from "@tanstack/react-query";

function CryptoTracker() {

  const fetchBitcoin = async () => {
    const response = await fetch(
      "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
    );

    if (!response.ok) {
      throw new Error("API Error");
    }

    const result = await response.json();

    return result.bitcoin.usd;
  };

  const {
    data,
    isPending,
    isError,
    isFetching
  } = useQuery({
    queryKey: ["bitcoin"],
    queryFn: fetchBitcoin,
    refetchInterval: 10000
  });

  if (isPending) {
    return <h2>Loading...</h2>;
  }

  if (isError) {
    return <h2>Something went wrong!</h2>;
  }

  return (
    <div className="crypto">

      <h1>Bitcoin Tracker</h1>

      <h2>Bitcoin Price: ${data}</h2>

      <p>
        {isFetching && !isPending ? (
          <>
            <span className="dot"></span>
            Updating Price...
          </>
        ) : (
          "Price Updated"
        )}
      </p>

    </div>
  );
}

export default CryptoTracker;