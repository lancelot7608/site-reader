import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';

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

  const handleTextSelect = (e) => {
    const selection = window.getSelection();
    const text = selection.toString();
    if (text.length > 0) setSelectedText(text);
  };

  const handleSubmit = () => {
    if (selectedText && comment) {
      setComments([...comments, {
        text: selectedText,
        comment,
        gptReply: `GPT: Ця фраза символізує внутрішній перелом героя. Він переходить від дії до осмислення.`,
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
    <div className="p-4 space-y-6">
      {chapters.map((ch) => (
        <Card key={ch.id} onMouseUp={handleTextSelect} className="cursor-text">
          <CardContent>
            <h2 className="text-xl font-bold mb-2">{ch.title}</h2>
            <p>{ch.content}</p>
          </CardContent>
        </Card>
      ))}

      {selectedText && (
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Ви виділили: "{selectedText}"</p>
          <Textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Ваше питання або коментар"
          />
          <Button onClick={handleSubmit}>Надіслати</Button>
        </div>
      )}

      <div className="space-y-4">
        {comments.map((c, i) => (
          <Card key={i} className="bg-muted">
            <CardContent className="space-y-2">
              <p><strong>Мітка:</strong> "{c.text}"</p>
              <p><strong>Коментар:</strong> {c.comment}</p>
              <p><strong>{c.gptReply}</strong></p>
              {c.authorReply ? (
                <p><strong>Автор:</strong> {c.authorReply}</p>
              ) : (
                <Textarea
                  placeholder="Ваша відповідь як автора"
                  onBlur={(e) => handleAuthorReply(i, e.target.value)}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
