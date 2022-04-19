import React from "react";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
const queryClient = new QueryClient();

const HomeApi = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Example />
    </QueryClientProvider>
  );
};

export default HomeApi;

function Example() {
  const { isLoading, error, data } = useQuery("repoData", () =>
    fetch("https://jsonplaceholder.typicode.com/posts").then((res) =>
      res.json()
    )
  );
  if (isLoading) return "Loading...";

  if (error) return "An error has occurred: " + error.message;

  return (
    <>
      {data ? (
        <>
          {data.map((item, i) => {
            return (
              <div key={i}>
                <h6>
                  {i + 1}
                  {item.title}
                </h6>
              </div>
            );
          })}
        </>
      ) : error ? (
        () => error.message
      ) : null}
    </>
  );
}
