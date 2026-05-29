import { Heart, MessageCircle, Users } from "lucide-react";
import { communityPosts } from "./community-dummy";

export default function CommunityCard() {
  return (
    <section className="card grow lg:col-span-4">
      <div className="mb-lg flex items-center justify-between">
        <div>
          <h2 className="headline-md text-on-surface">Community</h2>
          <p className="label-sm mt-1 text-on-surface-variant">
            Climbers are talking now
          </p>
        </div>

        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary-container text-on-secondary-container">
          <Users size={20} strokeWidth={2.25} />
        </div>
      </div>

      <div className="space-y-3">
        {communityPosts.map((post, index) => (
          <article
            key={post.id}
            className={`rounded-xl bg-surface-container-low p-md transition-colors hover:bg-surface-container ${
              index !== communityPosts.length - 1 ? "" : ""
            }`}
          >
            <div className="mb-2 flex items-center justify-between gap-2">
              <span className="label-sm rounded-full bg-card px-2 py-1 text-primary">
                {post.tag}
              </span>
              <span className="label-sm text-on-surface-variant">
                {post.author}
              </span>
            </div>

            <h3 className="label-md mb-1 font-bold text-on-surface">
              {post.title}
            </h3>

            <p className="body-sm line-clamp-2 text-on-surface-variant">
              {post.description}
            </p>

            <div className="mt-3 flex items-center gap-4 text-on-surface-variant">
              <div className="flex items-center gap-1">
                <Heart size={15} strokeWidth={2.25} />
                <span className="label-sm">{post.likes}</span>
              </div>

              <div className="flex items-center gap-1">
                <MessageCircle size={15} strokeWidth={2.25} />
                <span className="label-sm">{post.comments}</span>
              </div>
            </div>
          </article>
        ))}
      </div>

      <button
        type="button"
        className="label-md mt-lg w-full rounded-xl border border-outline-variant bg-transparent px-4 py-3 text-primary transition-colors hover:bg-surface-container-low"
      >
        View all posts
      </button>
    </section>
  );
}
