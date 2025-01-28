import React, { useEffect, useState } from "react";
import { getPrisoners }  from "../../../api/services";
import { Prisoner } from "../../../models/Prisoner";
import PrisonersResponse from "../../../models/Prisoner";


const PrisonersPage: React.FC = () => {
  const [prisoners, setPrisoners] = useState<Prisoner[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPrisoners = async () => {
      try {
        const response = await getPrisoners();
        const data: PrisonersResponse = response.data;
        setPrisoners(data.content);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchPrisoners();
  }, []);

  if (loading) {
    return <p>Загрузка...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h1>Список заключённых</h1>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Фамилия</th>
            <th>Имя</th>
            <th>Отчество</th>
            <th>Вес (кг)</th>
            <th>Паспорт</th>
            <th>Дата рождения</th>
            <th>Любимое блюдо</th>
            <th>Рейтинг</th>
            <th>Жив?</th>
          </tr>
        </thead>
        <tbody>
          {prisoners.map((prisoner) => (
            <tr key={prisoner.id}>
              <td>{prisoner.id}</td>
              <td>{prisoner.lastName}</td>
              <td>{prisoner.firstName}</td>
              <td>{prisoner.patronymic}</td>
              <td>{prisoner.weight}</td>
              <td>{prisoner.passport}</td>
              <td>{new Date(prisoner.birthDate).toLocaleDateString()}</td>
              <td>{prisoner.favoriteDish?.name || "Нет данных"}</td>
              <td>{prisoner.rating}</td>
              <td>{prisoner.isAlive ? "Да" : "Нет"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PrisonersPage;
