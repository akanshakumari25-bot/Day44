import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";

function CreatePostForm() {
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: async (newPost) => {
      const response = await fetch(
        "https://jsonplaceholder.typicode.com/posts",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newPost),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to create post");
      }

      return response.json();
    },

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["posts"] });

      alert("Post created successfully!");

      setTitle("");
      setBody("");
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    mutation.mutate({
      title: title,
      body: body,
      userId: 1,
    });
  };

  return (
    <div>
      <h2>Create New Post</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter post title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <br />
        <br />

        <textarea
          placeholder="Enter post body"
          value={body}
          onChange={(e) => setBody(e.target.value)}
          required
        />

        <br />
        <br />

        <button type="submit" disabled={mutation.isPending}>
          {mutation.isPending ? "Creating..." : "Create Post"}
        </button>
      </form>

      {mutation.isError && <p>Failed to create post!</p>}
    </div>
  );
}

export default CreatePostForm;
