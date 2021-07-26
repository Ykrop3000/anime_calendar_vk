import React, { useContext } from "react";
import PropTypes from "prop-types";
import moment from "moment";
import "moment/locale/ru"; // without this line it didn't work
moment.locale("ru");
import ConstantContext from "../context/ConstantContext";

import {
  Card,
  Headline,
  Div,
  Title,
  Header,
  Group,
  ContentCard,
} from "@vkontakte/vkui";
import "./card.css";

const CardItem = (props) => {
  const { kinds, statuses } = useContext(ConstantContext);
  if (!props.data.anime.russian) return "";
  return (
    <Card
      size="l"
      mode="shadow"
      className="card_wrap"
      onClick={() => props.go({ to: "anime", id: props.data.anime.id })}
      // style={{ maxWidth: "150px" }}
      // image={"https://shikimori.one/" + props.data.anime.image.preview}
      // subtitle={
      //   <Title level="4" weight="heavy" className="card_title">
      //     {props.data.anime.russian}
      //   </Title>
      // }
      // caption={moment(props.data.next_episode_at).calendar()}
    >
      <div className="card">
        <div className="poster">
          <div
            className="poster_image"
            style={{
              backgroundImage: `url(${"https://shikimori.one/" +
                props.data.anime.image.preview})`,
            }}
          ></div>
          {props.data.anime.score != 0.0 && (
            <span className="info_item poster_rate">
              {props.data.anime.score}
            </span>
          )}
          {props.data.anime.status == "anons" && (
            <span className="info_item poster_status">анонс</span>
          )}
        </div>
        <div className="card_content">
          <div className="card_title">{props.data.anime.russian}</div>
          <div className="card_subtitle">{props.data.anime.name}</div>
          <div className="card_info">
            <div className="info_item">{kinds[props.data.anime.kind]}</div>
            {props.data.duration && (
              <div className="info_item">
                {`${Math.ceil(props.data.duration / 60)} мин.`}
              </div>
            )}
          </div>
          <div className="card_time">
            {`${props.data.next_episode} серия, ${moment(
              props.data.next_episode_at
            ).calendar()}`}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CardItem;
