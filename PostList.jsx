import { useQuery } from "@tanstack/react-query";

const fetchPosts = async () => {
  const response = await fetch(
    "https://jsonplaceholder.typicode.com/posts"
  );

  if (!response.ok) {
    throw new Error("Failed to fetch posts");
  }

  return response.json();
};

function PostList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["posts"],
    queryFn: fetchPosts,
  });

  if (isLoading) {
    return <h3>Loading posts...</h3>;
  }

  if (isError) {
    return <h3>Something went wrong!</h3>;
  }

  return (
    <div>
      <h2>All Posts</h2>

      {data.slice(0, 10).map((post) => (
        <div key={post.id}>
          <h3>{post.title}</h3>
          <p>{post.body}</p>
          <hr />
        </div>
      ))}
    </div>
  );
}

export default PostList;