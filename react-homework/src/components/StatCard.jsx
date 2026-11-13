// Универсальная карточка для отображения одного показателя.
// Принимает три пропса:
//   - label: подпись (строка)
//   - value: значение (строка или число)
//   - icon: иконка (строка), по умолчанию ''
//   - color: цвет фона (строка), по умолчанию '#f0f0f0'


function StatCard({
    label,
    value,
    icon,
    color = "#f0f0f0",
}) {
  return (
    <div
      style={{
        background: color,
        padding: '16px 20px',
        borderRadius: '10px',
        textAlign: 'center',
        flex: 1, // растягивается, если внутри flex-контейнера
      }}
    >
      {/* value вставляем через {} */}<div
    style={{
        fontSize: 30,
        marginBottom: 8
    }}
>
    {icon}
</div>
      <div style={{ fontSize: '24px', fontWeight: 'bold' }}>{value}</div>
      <div style={{ fontSize: '13px', color: '#555', marginTop: 4 }}>
        {label}
      </div>
    </div>
  );
}

export default StatCard;