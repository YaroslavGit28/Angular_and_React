function Filters({
  current,
  onChange,
  priority,
  onPriorityChange,
  counts
}) {
  return (
    <div style={{ margin: '20px 0' }}>

      <h3>Фильтр по статусу</h3>

      <button
        onClick={() => onChange('all')}
        disabled={current === 'all'}
      >
        Все ({counts.all})
      </button>

      <button
        onClick={() => onChange('active')}
        disabled={current === 'active'}
      >
        Активные ({counts.active})
      </button>

      <button
        onClick={() => onChange('done')}
        disabled={current === 'done'}
      >
        Выполненные ({counts.done})
      </button>

      <hr />

      <h3>Фильтр по приоритету</h3>

      <button
        onClick={() => onPriorityChange('all')}
        disabled={priority === 'all'}
      >
        Все
      </button>

      <button
        onClick={() => onPriorityChange('high')}
        disabled={priority === 'high'}
      >
        Высокий
      </button>

      <button
        onClick={() => onPriorityChange('medium')}
        disabled={priority === 'medium'}
      >
        Средний
      </button>

      <button
        onClick={() => onPriorityChange('low')}
        disabled={priority === 'low'}
      >
        Низкий
      </button>

    </div>
  );
}

export default Filters;