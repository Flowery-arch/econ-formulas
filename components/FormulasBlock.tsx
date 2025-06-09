import React from 'react';
import FormulaLatex from './FormulaLatex';

interface Formula {
  label: string;
  title: string;
  expression: string;
  result: string | number;
  comment: string;
  unit: string;
  hints?: {text: string; value: string | number; source: string}[];
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
  const result3Raw = Math.trunc((result2 / result1) * 100) / 100;
  // Применяем правило округления: если в ответе есть 16 сотых или больше, округляем вверх
  const result3 = result3Raw;
  
  // Определяем количество людей для формул 15 и 16 по правилу округления
  const hasDecimal = ((result3Raw * 100) % 100) > 0;
  const hasSignificantDecimal = ((result3Raw * 100) % 100) >= 16;
  const peopleNeeded = hasSignificantDecimal ? Math.ceil(result3Raw) : (hasDecimal ? Math.floor(result3Raw) : result3Raw);

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
  const result9 = Math.trunc((result7 * result8 / 100) * 100) / 100;

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
  const result15 = Math.trunc((forecast / peopleNeeded) * 100) / 100;
  
  // Формула 16
  const result16 = Math.trunc((result10 / (peopleNeeded * 12)) * 100) / 100;

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
      title: 'Фонд рабочего времени',
      expression: `[365 - (${holidays} + 28 + (${workDays} \\cdot ${notWork/100}) + (${workDays} \\cdot ${notWorkDuty/100})) ] \\cdot ${shiftHours} - ${extraHolidays}`,
      result: result1,
      comment: 'Расчет годового фонда рабочего времени в часах с учетом выходных, праздников и сокращенных дней',
      unit: 'час',
      hints: [
        {text: 'Выходные и праздники', value: holidays, source: 'Исходные данные'},
        {text: 'Отпуск', value: 28, source: 'Стандартное значение'},
        {text: 'Дни по болезни', value: sickDays, source: `${workDays} × ${notWork}%`},
        {text: 'Дни на гос. обязанности', value: dutyDays, source: `${workDays} × ${notWorkDuty}%`},
        {text: 'Сокращение предпраздничных дней', value: extraHolidays, source: 'Исходные данные'}
      ]
    },
    {
      label: '2',
      title: 'Трудоемкость годовой программы',
      expression: `\\frac{${assemblyTime} \\cdot ${forecast}}{${divisor}}`,
      result: result2,
      comment: 'Расчет общей трудоемкости годовой программы в часах с учетом времени сборки одного изделия',
      unit: 'час',
      hints: [
        {text: 'Время сборки 1 изделия', value: assemblyTime, source: 'Исходные данные'},
        {text: 'Годовой прогноз', value: forecast, source: 'Исходные данные'},
        {text: 'Перевод минут в часы', value: divisor, source: '60 минут в часе'}
      ]
    },
    {
      label: '3',
      title: 'Расчетная численность рабочих',
      expression: `\\frac{${result2}}{${result1}}`,
      result: result3,
      comment: 'Определение необходимого количества рабочих для выполнения годовой программы',
      unit: 'чел',
      hints: [
        {text: 'Трудоемкость годовой программы', value: result2, source: 'Формула 2'},
        {text: 'Фонд рабочего времени', value: result1, source: 'Формула 1'}
      ]
    },
    {
      label: '4',
      title: 'Основная заработная плата',
      expression: `${hourlyRate} \\cdot ${result2}`,
      result: result4,
      comment: 'Расчет основной заработной платы с учетом часовой тарифной ставки и трудоемкости',
      unit: 'руб',
      hints: [
        {text: 'Часовая тарифная ставка', value: hourlyRate, source: 'Исходные данные'},
        {text: 'Трудоемкость годовой программы', value: result2, source: 'Формула 2'}
      ]
    },
    {
      label: '5',
      title: 'Доплата за руководство бригадой',
      expression: `${hourlyRate} \\cdot ${result1} \\cdot 1 \\cdot ${bonusDecimal}`,
      result: result5,
      comment: 'Расчет доплаты бригадиру с учетом тарифной ставки и фонда рабочего времени',
      unit: 'руб',
      hints: [
        {text: 'Часовая тарифная ставка', value: hourlyRate, source: 'Исходные данные'},
        {text: 'Фонд рабочего времени', value: result1, source: 'Формула 1'},
        {text: 'Процент доплаты', value: bonusPercent, source: result3 > 10 ? 'Доплата за руководство бригадой (свыше 10 чел)' : 'Доплата за руководство бригадой (до 10 чел)'}
      ]
    },
    {
      label: '6',
      title: 'Премия сборщика',
      expression: `(${result4} + 0 + 0) \\cdot ${workerBonusDecimal}`,
      result: result6,
      comment: 'Расчет премиальных выплат сборщику как процент от основной заработной платы',
      unit: 'руб',
      hints: [
        {text: 'Основная заработная плата', value: result4, source: 'Формула 4'},
        {text: 'Процент премии', value: workerBonusDecimal, source: 'Исходные данные'}
      ]
    },
    {
      label: '7',
      title: 'Основной фонд заработной платы',
      expression: `${result4} + 0 + 0 + ${result5} + ${result6}`,
      result: result7,
      comment: 'Сумма основной заработной платы, доплаты за руководство и премий',
      unit: 'руб',
      hints: [
        {text: 'Основная заработная плата', value: result4, source: 'Формула 4'},
        {text: 'Доплата за руководство бригадой', value: result5, source: 'Формула 5'},
        {text: 'Премия сборщика', value: result6, source: 'Формула 6'}
      ]
    },
    {
      label: '8',
      title: 'Коэффициент дополнительной зарплаты',
      expression: `\\frac{28}{${workDays}} \\cdot 100 + 1`,
      result: result8,
      comment: 'Расчет коэффициента дополнительной заработной платы с учетом отпусков и невыходов',
      unit: '%',
      hints: [
        {text: 'Дни отпуска', value: 28, source: 'Стандартное значение'},
        {text: 'Количество рабочих дней в году', value: workDays, source: 'Исходные данные'}
      ]
    },
    {
      label: '9',
      title: 'Дополнительная заработная плата',
      expression: `${result7} \\cdot ${result8}\\%`,
      result: result9,
      comment: 'Расчет дополнительной заработной платы с учетом коэффициента в процентах',
      unit: 'руб',
      hints: [
        {text: 'Основной фонд заработной платы', value: result7, source: 'Формула 7'},
        {text: 'Коэффициент дополнительной зарплаты', value: result8, source: 'Формула 8'}
      ]
    },
    {
      label: '10',
      title: 'Общий фонд заработной платы',
      expression: `${result7} + ${result9}`,
      result: result10,
      comment: 'Сумма основного и дополнительного фонда заработной платы',
      unit: 'руб',
      hints: [
        {text: 'Основной фонд заработной платы', value: result7, source: 'Формула 7'},
        {text: 'Дополнительная заработная плата', value: result9, source: 'Формула 9'}
      ]
    },
    {
      label: '11',
      title: 'Отчисления на социальные нужды',
      expression: `${result10} \\cdot ${accrualDecimal}`,
      result: result11,
      comment: 'Расчет отчислений на социальные нужды (30.6%) от общего фонда заработной платы',
      unit: 'руб',
      hints: [
        {text: 'Общий фонд заработной платы', value: result10, source: 'Формула 10'},
        {text: 'Начисление', value: accrualPercent, source: 'Исходные данные'}
      ]
    },
    {
      label: '12',
      title: 'Затраты на оплату труда с отчислениями',
      expression: `${result10} + ${result11}`,
      result: result12,
      comment: 'Сумма общего фонда заработной платы и отчислений на социальные нужды',
      unit: 'руб',
      hints: [
        {text: 'Общий фонд заработной платы', value: result10, source: 'Формула 10'},
        {text: 'Отчисления на социальные нужды', value: result11, source: 'Формула 11'}
      ]
    },
    {
      label: '13',
      title: 'Накладные расходы',
      expression: `${result10} \\cdot ${overheadDecimal}`,
      result: result13,
      comment: 'Расчет накладных расходов (75%) от общего фонда заработной платы',
      unit: 'руб',
      hints: [
        {text: 'Общий фонд заработной платы', value: result10, source: 'Формула 10'},
        {text: 'Начисление', value: overheadPercent, source: 'Исходные данные'}
      ]
    },
    {
      label: '14',
      title: 'Полная себестоимость',
      expression: `${result12} + ${result13} + 0 + 0`,
      result: result14,
      comment: 'Сумма затрат на оплату труда с отчислениями и накладных расходов',
      unit: 'руб',
      hints: [
        {text: 'Затраты на оплату труда с отчислениями', value: result12, source: 'Формула 12'},
        {text: 'Накладные расходы', value: result13, source: 'Формула 13'}
      ]
    },
    {
      label: '15',
      title: 'Выработка на одного рабочего',
      expression: `\\frac{${forecast}}{${peopleNeeded}}`,
      result: result15,
      comment: 'Расчет количества изделий, производимых одним рабочим. Для расчета используется количество рабочих с округлением: от 0.16 округляем вверх, при меньших дробных частях используем целую часть.',
      unit: 'шт',
      hints: [
        {text: 'Годовой производственный прогноз', value: forecast, source: 'Исходные данные'},
        {text: 'Количество рабочих', value: peopleNeeded, source: 'Формула 3 с округлением'},
        {text: 'Правило округления', value: 'От 0.16 округляем вверх, иначе берем целую часть', source: 'Условие задачи'}
      ]
    },
    {
      label: '16',
      title: 'Среднемесячная зарплата рабочего',
      expression: `\\frac{${result10}}{${peopleNeeded} \\cdot 12}`,
      result: result16,
      comment: 'Расчет среднемесячной заработной платы одного рабочего. Общий фонд заработной платы делится на количество рабочих (с округлением), умноженное на количество месяцев в году.',
      unit: 'руб',
      hints: [
        {text: 'Общий фонд заработной платы', value: result10, source: 'Формула 10'},
        {text: 'Количество рабочих', value: peopleNeeded, source: 'Формула 3 с округлением'},
        {text: 'Правило округления', value: 'От 0.16 округляем вверх, иначе берем целую часть', source: 'Условие задачи'},
        {text: 'Количество месяцев в году', value: 12, source: 'Константа'}
      ]
    },
    {
      label: '17',
      title: 'Выручка',
      expression: `${result14} \\cdot ${forecast}`,
      result: result17,
      comment: 'Расчет общей стоимости всех изделий',
      unit: 'руб',
      hints: [
        {text: 'Полная себестоимость', value: result14, source: 'Формула 14'},
        {text: 'Годовой производственный прогноз', value: forecast, source: 'Исходные данные'}
      ]
    },
    {
      label: '18',
      title: 'Маржинальная прибыль',
      expression: `${result17} - ${result12}`,
      result: result18,
      comment: 'Расчет прибыли (разница между общей стоимостью и затратами)',
      unit: 'руб',
      hints: [
        {text: 'Выручка', value: result17, source: 'Формула 17'},
        {text: 'Затраты на оплату труда с отчислениями', value: result12, source: 'Формула 12'}
      ]
    },
    {
      label: '19',
      title: 'Рентабельность',
      expression: `\\frac{${result18}}{${result17}} \\cdot 100`,
      result: result19,
      comment: 'Расчет рентабельности в процентах',
      unit: '%',
      hints: [
        {text: 'Маржинальная прибыль', value: result18, source: 'Формула 18'},
        {text: 'Выручка', value: result17, source: 'Формула 17'}
      ]
    },
    {
      label: '20',
      title: 'Точка безубыточности',
      expression: `\\frac{${result13}}{\\frac{${result14}}{${forecast}} - \\frac{${result12}}{${forecast}}}`,
      result: result20,
      comment: 'Расчет точки безубыточности (количество изделий)',
      unit: 'шт',
      hints: [
        {text: 'Накладные расходы', value: result13, source: 'Формула 13'},
        {text: 'Полная себестоимость', value: result14, source: 'Формула 14'},
        {text: 'Годовой производственный прогноз', value: forecast, source: 'Исходные данные'}
      ]
    },
    {
      label: '21',
      title: 'Запас финансовой прочности',
      expression: `\\frac{${result13}}{(${result17} - ${result12}) \\cdot ${result17}}`,
      result: result21,
      comment: 'Расчет запаса финансовой прочности',
      unit: '%',
      hints: [
        {text: 'Накладные расходы', value: result13, source: 'Формула 13'},
        {text: 'Маржинальная прибыль', value: result18, source: 'Формула 18'},
        {text: 'Выручка', value: result17, source: 'Формула 17'}
      ]
    },
  ];

  // Стили для светлой темы
  const formulaBlockStyle = {
    background: 'rgba(255, 255, 255, 0.8)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: '8px',
    padding: '16px',
    marginBottom: '20px',
    boxShadow: '0 2px 6px rgba(0, 0, 0, 0.05)'
  };

  const formulaTitleStyle = {
    fontSize: '18px',
    fontWeight: '600',
    marginBottom: '12px',
    color: '#333',
    display: 'flex',
    alignItems: 'center',
    gap: '8px'
  };

  const formulaLabelStyle = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '28px',
    height: '28px',
    borderRadius: '50%',
    background: 'rgba(0, 0, 0, 0.05)',
    color: '#444',
    fontSize: '14px',
    fontWeight: '600'
  };

  const resultBlockStyle = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: '8px',
    padding: '10px 16px',
    background: 'rgba(0, 0, 0, 0.03)',
    borderRadius: '6px',
    marginTop: '12px',
    fontSize: '16px'
  };

  const resultLabelStyle = {
    fontWeight: '500',
    color: '#555'
  };

  const resultValueStyle = {
    fontWeight: '600',
    color: '#333'
  };

  const resultUnitStyle = {
    color: '#777',
    fontSize: '14px',
    marginLeft: '4px'
  };

  const commentStyle = {
    fontSize: '14px',
    color: '#666',
    marginTop: '10px',
    fontStyle: 'italic',
    lineHeight: '1.4'
  };

  // Стили для подсказок
  const hintsContainerStyle = {
    marginTop: '16px',
    background: 'rgba(240, 248, 255, 0.7)',
    border: '1px solid rgba(0, 0, 0, 0.05)',
    borderRadius: '6px',
    padding: '12px'
  };

  const hintsHeaderStyle = {
    fontSize: '14px',
    fontWeight: '600',
    color: '#444',
    marginBottom: '8px',
    display: 'flex',
    alignItems: 'center',
    gap: '6px'
  };

  const hintsListStyle = {
    margin: '0',
    padding: '0',
    listStyle: 'none',
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '6px'
  };

  const hintItemStyle = {
    fontSize: '13px',
    color: '#555',
    display: 'flex',
    justifyContent: 'space-between',
    padding: '4px 0',
    borderBottom: '1px dashed rgba(0, 0, 0, 0.05)'
  };

  const hintTextStyle = {
    fontWeight: '500'
  };

  const hintValueStyle = {
    fontWeight: '600',
    color: '#333'
  };

  const hintSourceStyle = {
    fontSize: '12px',
    color: '#777',
    fontStyle: 'italic'
  };

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      gap: '16px',
      paddingBottom: '15px'
    }}>
      {formulas.map((formula, index) => (
        <div key={formula.label} style={formulaBlockStyle}>
          <div style={formulaTitleStyle}>
            <span style={formulaLabelStyle}>{formula.label}</span>
            {formula.title}
          </div>
          <FormulaLatex formula={formula.expression} />
          <div style={resultBlockStyle}>
            <span style={resultLabelStyle}>Результат:</span>
            <span style={resultValueStyle}>{typeof formula.result === 'number' 
              ? formula.result.toLocaleString('ru-RU', {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2
                })
              : formula.result}</span>
            <span style={resultUnitStyle}>{formula.unit}</span>
          </div>
          <div style={commentStyle}>{formula.comment}</div>
          
          {formula.hints && formula.hints.length > 0 && (
            <div style={hintsContainerStyle}>
              <div style={hintsHeaderStyle}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm-1-11v6h2v-6h-2zm0-4v2h2V7h-2z" 
                    fill="#4a6fa5"/>
                </svg>
                Используемые значения:
              </div>
              <ul style={hintsListStyle}>
                {formula.hints.map((hint, hintIndex) => (
                  <li key={hintIndex} style={hintItemStyle}>
                    <span style={hintTextStyle}>{hint.text}:</span>
                    <div>
                      <span style={hintValueStyle}>{typeof hint.value === 'number' ? hint.value.toLocaleString('ru-RU', {minimumFractionDigits: 0, maximumFractionDigits: 2}) : hint.value}</span>
                      <span style={hintSourceStyle}> ({hint.source})</span>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default FormulasBlock; 