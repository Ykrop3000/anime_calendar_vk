import React from "react";
import PropTypes from "prop-types";

import {
  Group,
  PanelHeaderBack,
  Title,
  Separator,
  SimpleCell,
  PanelHeader,
  Panel,
  InfoRow,
} from "@vkontakte/vkui";

import moment from "moment";
import "moment/locale/ru"; // without this line it didn't work
moment.locale("ru");

const Genre = ({ name }) => {
  return <div className="genre info_item">{name}</div>;
};

const ModalCard = (props) => {
  return (
    <Panel id={props.id}>
      <PanelHeader
        fixed={false}
        left={<PanelHeaderBack onClick={() => props.goBack()} />}
      >
        {props.data.name}
      </PanelHeader>

      <div className="header_wrap">
        {props.data.screenshots?.[0]?.original && (
          <div
            className="header_poster"
            style={{
              backgroundImage: `url(https://shikimori.one${props.data.screenshots?.[0]?.original})`,
            }}
          ></div>
        )}

        <div className="modal_header_wrap">
          <img
            src={"https://shikimori.one/" + props.data.image.original}
            alt={props.data.name}
            style={{ borderRadius: "4px" }}
          />
        </div>
      </div>

      <Group
        style={{
          zIndex: 2,
          marginTop: "-35px",
          borderRadius: "18px 18px 0 0",
          backgroundColor: "var(--background_suggestions)",
        }}
        header={
          <div className="section_title">
            <Title level="2" weight="heavy">
              {props.data.russian}
            </Title>
            <Title level="3" weight="regular">
              {props.data.name}
            </Title>
            <Separator style={{ margin: "24px 0 12px 0" }} />
          </div>
        }
      >
        {props.data.next_episode_at && (
          <>
            <SimpleCell>
              <InfoRow header="Следующая серия">
                <span className="next_episode">
                  {`${moment(props.data.next_episode_at).calendar()}`}
                </span>
              </InfoRow>
            </SimpleCell>
            <Separator style={{ margin: "12px 0" }} />
          </>
        )}

        <SimpleCell multiline>
          <InfoRow header="Жанры">
            {props.data.genres?.map((e, id) => (
              <Genre key={id} name={e.russian} />
            ))}
          </InfoRow>
        </SimpleCell>

        {props.data.description && (
          <>
            <Separator style={{ margin: "12px 0" }} />

            <SimpleCell multiline>
              <InfoRow header="Описание">
                <div className="description">
                  {props.data.description.replace(
                    /\[(\w+)[^\]]*](.*?)\[\/\1]/g,
                    ""
                  )}
                </div>
              </InfoRow>
            </SimpleCell>
          </>
        )}
        {props.data.screenshots?.length !== 0 && (
          <>
            <Separator style={{ margin: "12px 0" }} />

            <SimpleCell multiline className="del">
              <InfoRow header="Кадры">
                {props.data.screenshots.map((e) => (
                  <img
                    src={"https://shikimori.one/" + e.preview}
                    alt={props.data.name}
                    style={{
                      borderRadius: "8px",
                      margin: "4px",
                      maxWidth: "333px",
                    }}
                  />
                ))}
              </InfoRow>
            </SimpleCell>
          </>
        )}
      </Group>
    </Panel>
  );
};

export default ModalCard;
