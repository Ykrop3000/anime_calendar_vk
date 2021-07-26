import { createContext, useState } from "react";

const ConstantContext = createContext();

export const ConstantProvider = (props) => {
  const [calendar, setCalendar] = useState([]);
  const [dates, setDates] = useState([]);
  const currentDate = new Date().getDate();
  const tomorrow = new Date();
  tomorrow.setDate(currentDate + 1);
  const [selectedDate, setSelectedDate] = useState(tomorrow.getDate());

  const stats = {
    planned: "Запланировано",
    watching: "Смотрю",
    rewatching: "Пересматриваю",
    completed: "Просмотрено",
    on_hold: "Отложено",
    dropped: "Брошено",
  };
  const kinds = {
    tv: "TV Сериал",
    movie: "Фильм",
    ova: "OVA",
    ona: "ONA",
    special: "Спешл",
    music: "Клип",
    // manga: "Манга",
    // manhwa: "Манхва",
    // manhua: "Маньхуа",
    // one_shot: "Ваншот",
    // doujin: "Додзинси",
  };
  const statuses = {
    anons: "Анонсировано",
    ongoing: "Сейчас выходит",
    released: "Вышедшее",
  };

  return (
    <ConstantContext.Provider
      value={{
        stats,
        statuses,
        kinds,
        calendar,
        setCalendar,
        dates,
        setDates,
        selectedDate,
        setSelectedDate,
      }}
    >
      {props.children}
    </ConstantContext.Provider>
  );
};

export default ConstantContext;
