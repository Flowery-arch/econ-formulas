"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./page.module.css";
import GivenBlock from "../components/GivenBlock";
import FormulasBlock from "../components/FormulasBlock";

const initialData = [
  { label: "Годовой производственный прогноз", value: 32000, unit: "шт." },
  { label: "Количество рабочих дней в году", value: 247, unit: "дней" },
  { label: "Количество рабочих смен", value: 1, unit: "шт." },
  { label: "Время рабочей смены", value: 8, unit: "часов" },
  { label: "Время сборки 1 изделия", value: 10, unit: "минут" },
  { label: "Количество выходных и праздничных дней", value: 118, unit: "дней" },
  { label: "Количество дней невыхода на работу при исполнении гос. обязанностей", value: 0.3, unit: "%" },
  { label: "Количество выходных праздничных дней", value: 4, unit: "дня" },
  { label: "Количество дней по болезни", value: 2, unit: "%" },
  { label: "Время сокращения предпраздничных дней", value: 1, unit: "час" },
  { label: "Средняя часовая тарифная ставка", value: 381.77, unit: "₽" },
  { label: "Доплата за руководство бригадой (до 10 чел)", value: 15, unit: "%" },
  { label: "Доплата за руководство бригадой (свыше 10 чел)", value: 20, unit: "%" },
  { label: "Премия сборщика", value: 35, unit: "%" },
  { label: "Накладные расходы", value: 75, unit: "%" },
  { label: "Начисление", value: 30.6, unit: "%" },
];

export default function Home() {
  const [givenData, setGivenData] = useState(initialData);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingData, setEditingData] = useState(initialData);

  const openModal = () => {
    setEditingData([...givenData]);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const saveChanges = () => {
    setGivenData([...editingData]);
    setIsModalOpen(false);
  };

  const handleInputChange = (index: number, value: string) => {
    const newData = [...editingData];
    newData[index].value = parseFloat(value) || 0;
    setEditingData(newData);
  };

  return (
    <div className={styles.page}>
      <div className={styles["content-grid"]}>
        <div className={styles["left-top"]}>
          <div className={styles.dataHeader}>
            <h2>Исходные данные</h2>
            <button onClick={openModal} className={styles.editButton}>
              Изменить данные
            </button>
          </div>
          <GivenBlock data={givenData} title="" />
        </div>
        <div className={styles["main-content"]}>
          <FormulasBlock data={givenData} />
        </div>
      </div>

      {isModalOpen && (
        <div className={styles.modalOverlay}>
          <div className={styles.modal}>
            <div className={styles.modalHeader}>
              <h2>Редактирование исходных данных</h2>
              <button onClick={closeModal} className={styles.closeButton}>
                ×
              </button>
            </div>
            <div className={styles.modalContent}>
              {editingData.map((item, index) => (
                <div key={index} className={styles.inputGroup}>
                  <label>{item.label}</label>
                  <div className={styles.inputWithUnit}>
                    <input
                      type="number"
                      value={item.value}
                      onChange={(e) => handleInputChange(index, e.target.value)}
                      step="any"
                    />
                    <span className={styles.unit}>{item.unit}</span>
                  </div>
                </div>
              ))}
            </div>
            <div className={styles.modalFooter}>
              <button onClick={closeModal} className={styles.cancelButton}>
                Отмена
              </button>
              <button onClick={saveChanges} className={styles.saveButton}>
                Сохранить
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
