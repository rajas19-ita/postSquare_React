import getTimePassed from "../utils/getTimePassed";

function Comment({ author, comment, avatar, createdAt }) {
  return (
    <div className="flex mx-5 my-5">
      <img
        src={avatar}
        alt="avatar"
        className="rounded-full w-9 h-9 self-start mr-3.5"
      />
      <div className="flex flex-col">
        <p className="break-words font-normal mb-1 text-[0.875rem] leading-[1.4rem]">
          <span className="font-medium text-[0.875rem] tracking-wide">
            {author}{" "}
          </span>
          {comment}
        </p>
        <h3 className="text-gray-500 text-[0.8125rem]">
          {getTimePassed(createdAt)}
        </h3>
      </div>
    </div>
  );
}
export default Comment;
