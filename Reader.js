import { useState } from 'react';

const chapters = [
  {
    id: 1,
    title: 'Третя Ера — Розломи',
    content: 'Він зрозумів, що це не його війна. Його шлях починався далі, за руїнами часу.',
  },
  {
    id: 2,
    title: 'Перша Ера — Початок',
    content: 'Колись давно двері відкривались лише в один бік — туди, де ще не було повернення.',
  },
];

export default function Reader() {
  const [selectedText, setSelectedText] = useState('');
  const [comment, setComment] = useState('');
  const [comments, setComments] = useState([]);

  const handleTextSelect = () => {
    const selection = window.getSelection();
    const text = selection.toString();
    if (text.length > 0) setSelectedText(text);
  };

  const handleSubmit = () => {
    if (selectedText && comment) {
      setComments([...comments, {
        text: selectedText,
        comment,
        gptReply: 'GPT: Ця фраза символізує внутрішній перелом героя. Він переходить від дії до осмислення.',
        authorReply: null,
      }]);
      setComment('');
      setSelectedText('');
    }
  };

  const handleAuthorReply = (index, reply) => {
    const updated = [...comments];
    updated[index].authorReply = reply;
    setComments(updated);
  };

  return (
    <div style={{ padding: '1rem' }} onMouseUp={handleTextSelect}>
      {chapters.map((ch) => (
        <div key={ch.id} style={{ border: '1px solid #ccc', padding: '1rem', marginBottom: '1rem' }}>
          <h2>{ch.title}</h2>
          <p>{ch.content}</p>
        </div>
      ))}

      {selectedText && (
        <div style={{ marginBottom: '1rem' }}>
          <p><em>Ви виділили:</em> "{selectedText}"</p>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваше питання або коментар"
            rows={3}
            style={{ width: '100%', marginBottom: '0.5rem' }}
          />
          <button onClick={handleSubmit}>Надіслати</button>
        </div>
      )}

      {comments.map((c, i) => (
        <div key={i} style={{ border: '1px solid #eee', padding: '0.5rem', marginBottom: '0.5rem' }}>
          <p><strong>Мітка:</strong> "{c.text}"</p>
          <p><strong>Коментар:</strong> {c.comment}</p>
          <p><strong>{c.gptReply}</strong></p>
          {c.authorReply ? (
            <p><strong>Автор:</strong> {c.authorReply}</p>
          ) : (
            <textarea
              placeholder="Ваша відповідь як автора"
              onBlur={(e) => handleAuthorReply(i, e.target.value)}
              rows={2}
              style={{ width: '100%' }}
            />
          )}
        </div>
      ))}
    </div>
  );
}
