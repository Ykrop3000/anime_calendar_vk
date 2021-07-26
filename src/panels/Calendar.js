import React, { useContext } from "react";
import PropTypes from "prop-types";

import {
  Panel,
  PanelHeader,
  Header,
  Footer,
  PopoutWrapper,
  Spinner,
  PanelHeaderContext,
  PanelHeaderContent,
  Group,
  List,
  Cell,
  Button,
} from "@vkontakte/vkui";

import { Icon24Done, Icon16Dropdown } from "@vkontakte/icons";

import Card from "../components/Card";
import moment from "moment";

import ConstantContext from "../context/ConstantContext";

import "moment/locale/ru"; // without this line it didn't work
moment.locale("ru");

const Calendar = (props) => {
  const {
    calendar,
    setCalendar,
    dates,
    setDates,
    selectedDate,
    setSelectedDate,
  } = useContext(ConstantContext);

  const [contextOpened, setContextOpened] = React.useState(false);

  const fetchCalendar = () => {
    fetch("https://shikimori.one/api/calendar")
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        setCalendar(data);
        getDates(data);
      });
  };

  const getDates = (data) => {
    const keys = new Set();
    const dates = data
      .map((i) => i.next_episode_at)
      .sort(function(x, y) {
        if (new Date(x).getTime() < new Date(y).getTime()) {
          return -1;
        } else {
          return 1;
        }
      });

    for (let i of dates) {
      const candidate = new Date(i);
      if (candidate.getTime() > new Date().getTime()) {
        keys.add(candidate.getDate());
      }
    }
    setDates(Array.from(keys));
  };

  React.useEffect(() => {
    fetchCalendar();
  }, []);

  const toggleContext = () => {
    setContextOpened(!contextOpened);
  };
  const selectDate = (date) => {
    setSelectedDate(date);
    setContextOpened(false);
  };
  const getDateNamed = (data) => {
    if (calendar.length === 0) return "";
    return moment(
      calendar.filter((e) => new Date(e.next_episode_at).getDate() == data)?.[0]
        ?.next_episode_at
    )
      ?.calendar()
      .split(",")[0];
  };

  return (
    <Panel id={props.id}>
      <PanelHeader fixed={false}>
        <PanelHeaderContent
        // aside={
        //   <Icon16Dropdown
        //     width={20}
        //     height={20}
        //     fill="var(--accent)"
        //     style={{
        //       transform: `rotate(${contextOpened ? "180deg" : "0"})`,
        //     }}
        //   />
        // }
        // onClick={toggleContext}
        // status={getDateNamed(selectedDate)}
        >
          Календарь аниме
        </PanelHeaderContent>
      </PanelHeader>

      <PanelHeaderContext
        fade={false}
        opened={contextOpened}
        onClose={toggleContext}
      >
        <List>
          {dates.map((e, id) => (
            <Cell
              key={id}
              after={
                selectedDate === e ? <Icon24Done fill="var(--accent)" /> : null
              }
              onClick={() => selectDate(e)}
            >
              {getDateNamed(e)}
            </Cell>
          ))}
        </List>
      </PanelHeaderContext>

      {dates.length === 0 && (
        <PopoutWrapper alignY="center" alignX="center">
          <Spinner size="large" style={{ margin: "20px 0" }} />
        </PopoutWrapper>
      )}
      {dates.length !== 0 && (
        <>
          <Group
            header={
              <div className="grid">
                <Button
                  size="l"
                  mode="secondary"
                  onClick={toggleContext}
                  style={{ width: "100%" }}
                  after={
                    <Icon16Dropdown
                      width={24}
                      height={24}
                      fill="var(--accent)"
                      style={{
                        transform: `rotate(${contextOpened ? "180deg" : "0"})`,
                      }}
                    />
                  }
                >
                  {getDateNamed(selectedDate)}
                </Button>
              </div>
            }
          >
            <div className="grid">
              {calendar
                .filter(
                  (e) => new Date(e.next_episode_at).getDate() == selectedDate
                )
                .map((i, id) => (
                  <Card key={id * selectedDate} go={props.go} data={i} />
                ))}
            </div>
            <Footer style={{ marginBottom: 0 }}>
              <a href="https://vk.com/aniseria">AniSeria</a>
              <a href="https://shikimori.one/">Shikimori calendar</a>
            </Footer>
          </Group>
        </>
      )}
    </Panel>
  );
};

Calendar.propTypes = {
  id: PropTypes.string.isRequired,
};

export default Calendar;
