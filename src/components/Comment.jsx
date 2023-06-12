import getTimePassed from "../utils/getTimePassed";

function Comment({ author, comment, avatar, createdAt }) {
  return (
    <div className="flex mx-5 my-5">
      <img
        src={avatar}
        alt="avatar"
        className="rounded-full w-9 h-9 self-start mr-4"
      />
      <div className="flex flex-col">
        <p className="font-normal tracking-wide break-words mb-1 text-sm">
          <span className="font-medium text-base tracking-wide">{author} </span>
          {comment}
        </p>
        <h3 className=" tracking-wide text-gray-500 text-sm">
          {getTimePassed(createdAt)}
        </h3>
      </div>
    </div>
  );
}
export default Comment;
