import { FC } from "react";
// Components
import { FaArrowUp, FaLink, FaUserAlt, FaPeace } from "react-icons/fa";
// Helpers
import { cx } from "@/helpers";
import { getStoryColor, parseUnixTime } from "@/components/Card/helpers";
// Types
import { TopStoriesWithAuthors } from "@/services/topstoriesService/topstoriesService";
// Styles
import "./Card.scss";

const Card: FC<TopStoriesWithAuthors> = (props): JSX.Element => {
  const { image, time, author, score, url, title } = props;

  // Convert unix time number to a readable string
  const date = parseUnixTime(time);
  // Get story color gradient based on score
  const storyColor = getStoryColor(score);

  return (
    <article className="card">
      <img src={image} alt="programmer" className="card__image" />
      <h5 className="card__title">{title}</h5>
      <div className={cx("card__score", storyColor)}>
        <FaArrowUp />
        <p>{score}</p>
      </div>
      {author?.id && (
        <div className="card__author">
          <FaUserAlt />
          <p>{author?.id}</p>
        </div>
      )}
      {author?.karma && (
        <div className="card__karma">
          <FaPeace />
          <p>{author.karma}</p>
        </div>
      )}
      <footer className={cx("card__footer", storyColor)}>
        <p className="card__timestamp text-small bold">{date}</p>
        <a href={url} className="card__url">
          <FaLink />
        </a>
      </footer>
    </article>
  );
};

export default Card;
