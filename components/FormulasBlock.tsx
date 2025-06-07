import React from 'react';
import FormulaLatex from './FormulaLatex';

interface Formula {
  label: string;
  expression: string;
  result: string | number;
}

interface FormulasBlockProps {
  data: { label: string; value: string | number; unit?: string }[];
}

const FormulasBlock: React.FC<FormulasBlockProps> = ({ data }) => {
  // Получаем значения из исходных данных
  const holidays = Number(data.find(d => d.label === 'Количество выходных и праздничных дней')?.value) || 0;
  const extraHolidays = Number(data.find(d => d.label === 'Количество выходных праздничных дней')?.value) || 0;
  const holidaysSum = holidays + extraHolidays || 146;
  const workDays = Number(data.find(d => d.label === 'Количество рабочих дней в году')?.value) || 247;
  const notWork = Number(data.find(d => d.label === 'Количество дней по болезни')?.value) || 0;
  const notWorkDuty = Number(data.find(d => d.label === 'Количество дней невыхода на работу при исполнении гос. обязанностей')?.value) || 0;
  const shiftHours = Number(data.find(d => d.label === 'Время рабочей смены')?.value) || 8;
  const assemblyTime = Number(data.find(d => d.label === 'Время сборки 1 изделия')?.value) || 10;
  const forecast = Number(data.find(d => d.label === 'Годовой производственный прогноз')?.value) || 32000;

  // Пошаговый расчет
  const sickDays = Math.trunc(workDays * notWork/100 * 1000) / 1000;
  const dutyDays = Math.trunc(workDays * notWorkDuty/100 * 1000) / 1000;
  const totalNonWorkDays = Math.trunc((holidays + 28 + sickDays + dutyDays) * 1000) / 1000;
  const workingDays = Math.trunc((365 - totalNonWorkDays) * 1000) / 1000;
  const result1 = Math.trunc((workingDays * shiftHours - extraHolidays) * 100) / 100;

  // Формула 2
  const divisor = 60;
  const result2 = Math.trunc((assemblyTime * forecast / divisor) * 100) / 100;
  
  // Формула 3
  const result3 = Math.trunc((result2 / result1) * 100) / 100;

  // Формула 4
  const hourlyRate = Number(data.find(d => d.label === 'Средняя часовая тарифная ставка')?.value) || 0;
  const result4 = Math.trunc((hourlyRate * result2) * 100) / 100;

  // Формула 5
  const teamLeadBonusUnder10 = Number(data.find(d => d.label === 'Доплата за руководство бригадой (до 10 чел)')?.value) || 15;
  const teamLeadBonusOver10 = Number(data.find(d => d.label === 'Доплата за руководство бригадой (свыше 10 чел)')?.value) || 20;
  const bonusPercent = result3 > 10 ? teamLeadBonusOver10 : teamLeadBonusUnder10;
  const bonusDecimal = bonusPercent/100;
  const result5 = Math.trunc((hourlyRate * result1 * 1 * bonusDecimal) * 100) / 100;

  // Формула 6
  const workerBonus = Number(data.find(d => d.label === 'Премия сборщика')?.value) || 0;
  const workerBonusDecimal = workerBonus/100;
  const result6Raw = (result4 + 0 + 0) * workerBonusDecimal;
  const result6 = Math.trunc(result6Raw * 100) / 100;

  // Формула 7
  const result7 = Math.trunc((result4 + 0 + 0 + result5 + result6) * 100) / 100;

  // Формула 8
  const result8 = Math.trunc((28 / workDays * 100 + 1) * 100) / 100;

  // Формула 9
  const result9 = Math.trunc((result7 * result8) * 100) / 100;

  // Формула 10
  const result10 = Math.trunc((result7 + result9) * 100) / 100;

  // Get accrual value from data
  const accrualPercent = Number(data.find(d => d.label === 'Начисление')?.value) || 0;
  const accrualDecimal = Math.trunc(accrualPercent/100 * 1000) / 1000;

  // Формула 11
  const result11 = Math.trunc((result10 * accrualDecimal) * 100) / 100;

  // Формула 12
  const result12 = Math.trunc((result10 + result11) * 100) / 100;

  // Get overhead expenses value from data
  const overheadPercent = Number(data.find(d => d.label === 'Накладные расходы')?.value) || 0;
  const overheadDecimal = Math.trunc(overheadPercent/100 * 1000) / 1000;

  // Формула 13
  const result13 = Math.trunc((result10 * overheadDecimal) * 100) / 100;

  // Формула 14
  const result14 = Math.trunc((result12 + result13 + 0 + 0) * 100) / 100;

  // Формула 15
  const result15 = Math.trunc((forecast / assemblyTime) * 100) / 100;
  const peopleNeeded = Math.ceil(result3);
  
  // Формула 16
  const result16 = Math.trunc((result10 / Math.ceil(result3) * 12) * 100) / 100;

  // Формула 17
  const result17 = Math.trunc((result14 * forecast) * 100) / 100;

  // Формула 18
  const result18 = Math.trunc((result17 - result12) * 100) / 100;

  // Формула 19
  const result19 = Math.trunc((result18 / result17 * 100) * 100) / 100;

  // Формула 20
  const thirdDenominator = forecast;
  const firstNumerator = result13;
  const firstDenominator = result14 / thirdDenominator;
  const secondNumerator = result12 / thirdDenominator;
  const fractionsDifference = firstDenominator - secondNumerator;
  const result20 = Math.trunc((firstNumerator / fractionsDifference) * 100) / 100;

  // Формула 21
  const denominator21 = (result17 - result12) * result17;
  const result21 = Math.trunc((result13 / denominator21) * 100) / 100;

  const formulas: Formula[] = [
    {
      label: '1',
      expression: `[365 - (${holidays} + 28 + (${workDays} \\cdot ${notWork/100}) + (${workDays} \\cdot ${notWorkDuty/100})) ] \\cdot ${shiftHours} - ${extraHolidays}`,
      result: result1,
    },
    {
      label: '2',
      expression: `\\frac{${assemblyTime} \\cdot ${forecast}}{${divisor}}`,
      result: result2,
    },
    {
      label: '3',
      expression: `\\frac{${result2}}{${result1}}`,
      result: result3,
    },
    {
      label: '4',
      expression: `${hourlyRate} \\cdot ${result2}`,
      result: result4,
    },
    {
      label: '5',
      expression: `${hourlyRate} \\cdot ${result1} \\cdot 1 \\cdot ${bonusDecimal}`,
      result: result5,
    },
    {
      label: '6',
      expression: `(${result4} + 0 + 0) \\cdot ${workerBonusDecimal}`,
      result: result6,
    },
    {
      label: '7',
      expression: `${result4} + 0 + 0 + ${result5} + ${result6}`,
      result: result7,
    },
    {
      label: '8',
      expression: `\\frac{28}{${workDays}} \\cdot 100 + 1`,
      result: result8,
    },
    {
      label: '9',
      expression: `${result7} \\cdot ${result8}`,
      result: result9,
    },
    {
      label: '10',
      expression: `${result7} + ${result9}`,
      result: result10,
    },
    {
      label: '11',
      expression: `${result10} \\cdot ${accrualDecimal}`,
      result: result11,
    },
    {
      label: '12',
      expression: `${result10} + ${result11}`,
      result: result12,
    },
    {
      label: '13',
      expression: `${result10} \\cdot ${overheadDecimal}`,
      result: result13,
    },
    {
      label: '14',
      expression: `${result12} + ${result13} + 0 + 0`,
      result: result14,
    },
    {
      label: '15',
      expression: `\\frac{${forecast}}{${peopleNeeded}}`,
      result: Math.trunc((forecast / peopleNeeded) * 100) / 100,
    },
    {
      label: '16',
      expression: `\\frac{${result10}}{${Math.ceil(result3)}} \\cdot 12`,
      result: result16,
    },
    {
      label: '17',
      expression: `${result14} \\cdot ${forecast}`,
      result: result17,
    },
    {
      label: '18',
      expression: `${result17} - ${result12}`,
      result: result18,
    },
    {
      label: '19',
      expression: `\\frac{${result18}}{${result17}} \\cdot 100`,
      result: result19,
    },
    {
      label: '20',
      expression: `\\frac{${result13}}{\\frac{${result14}}{${forecast}} - \\frac{${result12}}{${forecast}}}`,
      result: result20,
    },
    {
      label: '21',
      expression: `\\frac{${result13}}{(${result17} - ${result12}) \\cdot ${result17}}`,
      result: result21,
    },
  ];

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingBottom: '15px'
    }}>
      {formulas.map((formula, index) => (
        <div key={formula.label} style={{
          background: 'var(--background)',
          border: '1px solid rgba(255, 255, 255, 0.08)',
          borderRadius: '10px',
          padding: '18px',
          paddingBottom: index === formulas.length - 1 ? '26px' : '22px',
          boxShadow: '0 2px 8px rgba(0, 0, 0, 0.1)',
          marginBottom: index === formulas.length - 1 ? '5px' : '4px'
        }}>
          <div style={{
            marginBottom: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '12px'
          }}>
            <span style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '4px 12px',
              borderRadius: '5px',
              fontSize: '14px',
              fontWeight: '500'
            }}>
              {`Формула ${formula.label}`}
            </span>
          </div>

          {formula.expression && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '16px',
              paddingBottom: '20px',
              borderRadius: '8px',
              marginBottom: '16px',
              border: '1px solid rgba(255, 255, 255, 0.05)'
            }}>
              <FormulaLatex formula={formula.expression} />
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '10px',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '12px 16px',
            paddingBottom: index === formulas.length - 1 ? '16px' : '14px',
            borderRadius: '8px'
          }}>
            <span style={{
              fontSize: '14px',
              opacity: 0.75
            }}>Результат:</span>
            <span style={{
              fontSize: '16px',
              fontWeight: '500'
            }}>{formula.result}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormulasBlock; 