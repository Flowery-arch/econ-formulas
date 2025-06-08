import React from 'react';
import FormulaLatex from './FormulaLatex';

interface Formula {
  label: string;
  title: string;
  expression: string;
  result: string | number;
  comment: string;
  unit: string;
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
      title: 'Фонд рабочего времени',
      expression: `[365 - (${holidays} + 28 + (${workDays} \\cdot ${notWork/100}) + (${workDays} \\cdot ${notWorkDuty/100})) ] \\cdot ${shiftHours} - ${extraHolidays}`,
      result: result1,
      comment: 'Расчет годового фонда рабочего времени в часах с учетом выходных, праздников и сокращенных дней',
      unit: 'час'
    },
    {
      label: '2',
      title: 'Трудоемкость годовой программы',
      expression: `\\frac{${assemblyTime} \\cdot ${forecast}}{${divisor}}`,
      result: result2,
      comment: 'Расчет общей трудоемкости годовой программы в часах с учетом времени сборки одного изделия',
      unit: 'час'
    },
    {
      label: '3',
      title: 'Расчетная численность рабочих',
      expression: `\\frac{${result2}}{${result1}}`,
      result: result3,
      comment: 'Определение необходимого количества рабочих для выполнения годовой программы',
      unit: 'чел'
    },
    {
      label: '4',
      title: 'Основная заработная плата',
      expression: `${hourlyRate} \\cdot ${result2}`,
      result: result4,
      comment: 'Расчет основной заработной платы с учетом часовой тарифной ставки и трудоемкости',
      unit: 'руб'
    },
    {
      label: '5',
      title: 'Доплата за руководство бригадой',
      expression: `${hourlyRate} \\cdot ${result1} \\cdot 1 \\cdot ${bonusDecimal}`,
      result: result5,
      comment: 'Расчет доплаты бригадиру с учетом тарифной ставки и фонда рабочего времени',
      unit: 'руб'
    },
    {
      label: '6',
      title: 'Премия сборщика',
      expression: `(${result4} + 0 + 0) \\cdot ${workerBonusDecimal}`,
      result: result6,
      comment: 'Расчет премиальных выплат сборщику как процент от основной заработной платы',
      unit: 'руб'
    },
    {
      label: '7',
      title: 'Основной фонд заработной платы',
      expression: `${result4} + 0 + 0 + ${result5} + ${result6}`,
      result: result7,
      comment: 'Сумма основной заработной платы, доплаты за руководство и премий',
      unit: 'руб'
    },
    {
      label: '8',
      title: 'Коэффициент дополнительной зарплаты',
      expression: `\\frac{28}{${workDays}} \\cdot 100 + 1`,
      result: result8,
      comment: 'Расчет коэффициента дополнительной заработной платы с учетом отпусков и невыходов',
      unit: '%'
    },
    {
      label: '9',
      title: 'Дополнительная заработная плата',
      expression: `${result7} \\cdot ${result8}`,
      result: result9,
      comment: 'Расчет дополнительной заработной платы с учетом коэффициента',
      unit: 'руб'
    },
    {
      label: '10',
      title: 'Общий фонд заработной платы',
      expression: `${result7} + ${result9}`,
      result: result10,
      comment: 'Сумма основного и дополнительного фонда заработной платы',
      unit: 'руб'
    },
    {
      label: '11',
      title: 'Отчисления на социальные нужды',
      expression: `${result10} \\cdot ${accrualDecimal}`,
      result: result11,
      comment: 'Расчет отчислений на социальные нужды (30.6%) от общего фонда заработной платы',
      unit: 'руб'
    },
    {
      label: '12',
      title: 'Затраты на оплату труда с отчислениями',
      expression: `${result10} + ${result11}`,
      result: result12,
      comment: 'Сумма общего фонда заработной платы и отчислений на социальные нужды',
      unit: 'руб'
    },
    {
      label: '13',
      title: 'Накладные расходы',
      expression: `${result10} \\cdot ${overheadDecimal}`,
      result: result13,
      comment: 'Расчет накладных расходов (75%) от общего фонда заработной платы',
      unit: 'руб'
    },
    {
      label: '14',
      title: 'Полная себестоимость',
      expression: `${result12} + ${result13} + 0 + 0`,
      result: result14,
      comment: 'Сумма затрат на оплату труда с отчислениями и накладных расходов',
      unit: 'руб'
    },
    {
      label: '15',
      title: 'Выработка на одного рабочего',
      expression: `\\frac{${forecast}}{${peopleNeeded}}`,
      result: Math.trunc((forecast / peopleNeeded) * 100) / 100,
      comment: 'Расчет количества изделий, производимых одним рабочим',
      unit: 'шт'
    },
    {
      label: '16',
      title: 'Среднемесячная зарплата рабочего',
      expression: `\\frac{${result10}}{${Math.ceil(result3)}} \\cdot 12`,
      result: result16,
      comment: 'Расчет среднемесячной заработной платы одного рабочего',
      unit: 'руб'
    },
          {
      label: '17',
      title: 'Общая стоимость изделий',
      expression: `${result14} \\cdot ${forecast}`,
      result: result17,
      comment: 'Расчет общей стоимости всех изделий',
      unit: 'руб'
    },
    {
      label: '18',
      title: 'Прибыль',
      expression: `${result17} - ${result12}`,
      result: result18,
      comment: 'Расчет прибыли (разница между общей стоимостью и затратами)',
      unit: 'руб'
    },
    {
      label: '19',
      title: 'Рентабельность',
      expression: `\\frac{${result18}}{${result17}} \\cdot 100`,
      result: result19,
      comment: 'Расчет рентабельности в процентах',
      unit: '%'
    },
    {
      label: '20',
      title: 'Точка безубыточности',
      expression: `\\frac{${result13}}{\\frac{${result14}}{${forecast}} - \\frac{${result12}}{${forecast}}}`,
      result: result20,
      comment: 'Расчет точки безубыточности (количество изделий)',
      unit: 'шт'
    },
    {
      label: '21',
      title: 'Запас финансовой прочности',
      expression: `\\frac{${result13}}{(${result17} - ${result12}) \\cdot ${result17}}`,
      result: result21,
      comment: 'Расчет запаса финансовой прочности',
      unit: '%'
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
          borderRadius: '12px',
          padding: '22px',
          paddingBottom: index === formulas.length - 1 ? '26px' : '24px',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
          marginBottom: index === formulas.length - 1 ? '10px' : '24px',
          transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{
            marginBottom: '16px',
            display: 'flex',
            alignItems: 'center',
            gap: '14px',
            flexWrap: 'wrap'
          }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.08)',
              padding: '6px 12px',
              borderRadius: '6px',
              fontSize: '14px',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              minWidth: '100px',
              boxShadow: '0 1px 3px rgba(0, 0, 0, 0.2)'
            }}>
              {`Формула ${formula.label}`}
            </div>
            <h3 style={{
              fontSize: '18px',
              fontWeight: '600',
              color: 'rgba(255, 255, 255, 0.95)',
              margin: 0
            }}>
              {formula.title}
            </h3>
          </div>
          <div style={{
            marginBottom: '18px',
            fontSize: '14px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.8)',
            background: 'rgba(255, 255, 255, 0.03)',
            padding: '12px 16px',
            borderRadius: '8px',
            borderLeft: '4px solid rgba(255, 255, 255, 0.15)',
            boxShadow: '0 1px 2px rgba(0, 0, 0, 0.1)'
          }}>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              marginBottom: '4px'
            }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" style={{ marginRight: '8px', opacity: 0.7 }}>
                <path d="M12 22C6.477 22 2 17.523 2 12S6.477 2 12 2s10 4.477 10 10-4.477 10-10 10zm0-2a8 8 0 100-16 8 8 0 000 16zm-1-5h2v2h-2v-2zm0-8h2v6h-2V7z" 
                  fill="rgba(255, 255, 255, 0.7)" />
              </svg>
              <span style={{ fontWeight: '600', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '0.5px', opacity: 0.7 }}>
                Пояснение
              </span>
            </div>
            {formula.comment}
          </div>

          {formula.expression && (
            <div style={{
              background: 'rgba(0, 0, 0, 0.25)',
              padding: '20px',
              paddingTop: '24px',
              paddingBottom: '24px',
              borderRadius: '10px',
              marginBottom: '20px',
              marginTop: '5px',
              border: '1px solid rgba(255, 255, 255, 0.08)',
              width: '100%',
              overflowX: 'auto',
              overflowY: 'visible',
              scrollbarWidth: 'none', /* Firefox */
              WebkitOverflowScrolling: 'touch',
              boxShadow: 'inset 0 1px 3px rgba(0, 0, 0, 0.3)',
              minHeight: '100px',
              display: 'flex',
              alignItems: 'center'
            }}>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                width: '100%',
                minHeight: '60px'
              }}>
                <FormulaLatex formula={formula.expression} />
              </div>
            </div>
          )}

          <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            background: 'rgba(0, 0, 0, 0.2)',
            padding: '14px 18px',
            paddingBottom: index === formulas.length - 1 ? '16px' : '14px',
            borderRadius: '8px',
            border: '1px solid rgba(255, 255, 255, 0.05)'
          }}>
            <span style={{
              fontSize: '14px',
              opacity: 0.75
            }}>Результат:</span>
            <div style={{
              display: 'flex',
              alignItems: 'baseline',
              gap: '6px'
            }}>
              <span style={{
                fontSize: '18px',
                fontWeight: '600',
                color: 'rgba(255, 255, 255, 0.95)'
              }}>
                {typeof formula.result === 'number' 
                  ? formula.result.toLocaleString('ru-RU', {
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 2
                    })
                  : formula.result}
              </span>
              <span style={{
                fontSize: '14px',
                opacity: 0.7,
                fontStyle: 'italic'
              }}>
                {formula.unit}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FormulasBlock; 