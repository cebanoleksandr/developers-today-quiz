import type { FC } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Question } from '../../../utils/types';
import type { BooleanQuestion, CheckboxQuestion, InputQuestion } from '../../../utils/interfaces';
import { TrashIcon } from '@heroicons/react/24/solid';

interface IProps {
  question: Question;
  onUpdate: (q: Question) => void;
  onRemove: (id: string) => void;
}

const QuestionEditor: FC<IProps> = ({ question, onUpdate, onRemove }) => {
  return (
    <div className="p-4 border border-gray-300 rounded-lg shadow-sm bg-white mb-4">
      <div className="flex justify-between items-center mb-3">
        <h3 className="text-lg font-semibold text-gray-800">
          Question {question.order} ({question.type})
        </h3>
        <button
          onClick={() => onRemove(question.id)}
          className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
        >
          Delete
        </button>
      </div>
      <div className="mb-3">
        <label htmlFor={`question-text-${question.id}`} className="block text-sm font-medium text-gray-700">
          Question:
        </label>
        <input
          type="text"
          id={`question-text-${question.id}`}
          value={question.text}
          onChange={(e) => onUpdate({ ...question, text: e.target.value })}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
          placeholder="Enter the question"
        />
      </div>

      {question.type === 'BOOLEAN' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Correct answer:</label>
          <div className="flex items-center space-x-4">
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`correctAnswer-${question.id}`}
                value="true"
                checked={(question as BooleanQuestion).correctAnswer === true}
                onChange={() => onUpdate({ ...question, correctAnswer: true } as BooleanQuestion)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">True</span>
            </label>
            <label className="inline-flex items-center">
              <input
                type="radio"
                name={`correctAnswer-${question.id}`}
                value="false"
                checked={(question as BooleanQuestion).correctAnswer === false}
                onChange={() => onUpdate({ ...question, correctAnswer: false } as BooleanQuestion)}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="ml-2 text-gray-700">False</span>
            </label>
          </div>
        </div>
      )}

      {question.type === 'INPUT' && (
        <div>
          <label htmlFor={`correctAnswer-input-${question.id}`} className="block text-sm font-medium text-gray-700">
            Correct answer:
          </label>
          <input
            type="text"
            id={`correctAnswer-input-${question.id}`}
            value={(question as InputQuestion).correctAnswer}
            onChange={(e) => onUpdate({ ...question, correctAnswer: e.target.value } as InputQuestion)}
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            placeholder="Enter the correct answer"
          />
        </div>
      )}

      {question.type === 'CHECKBOX' && (
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Options:</label>
          {(question as CheckboxQuestion).options.map((option, index) => (
            <div key={option.id} className="flex items-center mb-2">
              <input
                type="checkbox"
                id={`option-correct-${option.id}`}
                checked={(question as CheckboxQuestion).correctAnswerIds.includes(option.id)}
                onChange={(e) => {
                  const currentCorrectIds = (question as CheckboxQuestion).correctAnswerIds;
                  if (e.target.checked) {
                    onUpdate({ ...question, correctAnswerIds: [...currentCorrectIds, option.id] } as CheckboxQuestion);
                  } else {
                    onUpdate({ ...question, correctAnswerIds: currentCorrectIds.filter(id => id !== option.id) } as CheckboxQuestion);
                  }
                }}
                className="h-4 w-4 text-blue-600 border-gray-300 focus:ring-blue-500 mr-2"
              />
              <input
                type="text"
                value={option.text}
                onChange={(e) => {
                  const updatedOptions = (question as CheckboxQuestion).options.map((opt) =>
                    opt.id === option.id ? { ...opt, text: e.target.value } : opt
                  );
                  onUpdate({ ...question, options: updatedOptions } as CheckboxQuestion);
                }}
                className="block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm mr-2"
                placeholder={`Option ${index + 1}`}
              />
              <button
                onClick={() => {
                  const updatedOptions = (question as CheckboxQuestion).options.filter(opt => opt.id !== option.id);
                  const updatedCorrectIds = (question as CheckboxQuestion).correctAnswerIds.filter(id => id !== option.id);
                  onUpdate({ ...question, options: updatedOptions, correctAnswerIds: updatedCorrectIds } as CheckboxQuestion);
                }}
                className="px-2 py-1 bg-red-400 text-white rounded-md hover:bg-red-500 transition-colors text-sm"
              >
                <TrashIcon className='size-4 text-white' />
              </button>
            </div>
          ))}
          <button
            onClick={() => {
              const newOption = { id: uuidv4(), text: '' };
              onUpdate({ ...question, options: [...(question as CheckboxQuestion).options, newOption] } as CheckboxQuestion);
            }}
            className="mt-2 px-3 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors text-sm"
          >
            Add another option
          </button>
        </div>
      )}
    </div>
  );
};

export default QuestionEditor;
