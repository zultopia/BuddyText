import React, { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQuestionCircle, FaSpinner, FaCheckCircle, FaExclamationTriangle, FaLightbulb, FaBook } from 'react-icons/fa';
import { tutorService } from '../services/api';

const PageContainer = styled.div`
  max-width: 1000px;
  margin: 0 auto;
  padding: ${props => props.theme.spacing.xl} 0;
`;

const PageTitle = styled.h1`
  font-size: 2.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  text-align: center;
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormContainer = styled.div`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const FormGroup = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const Label = styled.label`
  display: block;
  font-weight: 500;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.sm};
`;

const TextArea = styled.textarea`
  width: 100%;
  min-height: 120px;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  resize: vertical;
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
  
  &::placeholder {
    color: ${props => props.theme.colors.textSecondary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: ${props => props.theme.spacing.md};
  border: 2px solid ${props => props.theme.colors.border};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-family: inherit;
  background: white;
  
  &:focus {
    outline: none;
    border-color: ${props => props.theme.colors.primary};
  }
`;

const Button = styled(motion.button)`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  background: linear-gradient(135deg, ${props => props.theme.colors.primary}, ${props => props.theme.colors.secondary});
  color: white;
  border: none;
  padding: ${props => props.theme.spacing.md} ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.md};
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
  
  &:hover:not(:disabled) {
    transform: translateY(-2px);
    box-shadow: ${props => props.theme.shadows.md};
  }
`;

const ResultContainer = styled(motion.div)`
  background: ${props => props.theme.colors.surface};
  padding: ${props => props.theme.spacing.xl};
  border-radius: ${props => props.theme.borderRadius.lg};
  box-shadow: ${props => props.theme.shadows.md};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultHeader = styled.div`
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
`;

const AnswerSection = styled.div`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.lg};
  border-radius: ${props => props.theme.borderRadius.md};
  border-left: 4px solid ${props => props.theme.colors.primary};
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const AnswerText = styled.p`
  font-size: 1.125rem;
  line-height: 1.8;
  color: ${props => props.theme.colors.text};
  margin: 0;
`;

const ExplanationSection = styled.div`
  margin-bottom: ${props => props.theme.spacing.lg};
`;

const SectionTitle = styled.h4`
  font-size: 1.25rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.md};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const ExplanationText = styled.p`
  color: ${props => props.theme.colors.textSecondary};
  line-height: 1.6;
  margin-bottom: ${props => props.theme.spacing.md};
`;

const ExamplesList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
`;

const ExampleItem = styled.li`
  background: ${props => props.theme.colors.background};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.sm};
  border-left: 3px solid ${props => props.theme.colors.secondary};
`;

const RelatedConcepts = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${props => props.theme.spacing.sm};
`;

const ConceptTag = styled.span`
  background: ${props => props.theme.colors.primary};
  color: white;
  padding: ${props => props.theme.spacing.xs} ${props => props.theme.spacing.sm};
  border-radius: ${props => props.theme.borderRadius.sm};
  font-size: 0.875rem;
  font-weight: 500;
`;

const ConfidenceBar = styled.div`
  background: ${props => props.theme.colors.background};
  height: 8px;
  border-radius: ${props => props.theme.borderRadius.sm};
  overflow: hidden;
  margin-top: ${props => props.theme.spacing.sm};
`;

const ConfidenceFill = styled.div`
  height: 100%;
  background: linear-gradient(90deg, ${props => props.theme.colors.error}, ${props => props.theme.colors.warning}, ${props => props.theme.colors.success});
  width: ${props => props.confidence * 100}%;
  transition: width 0.3s ease;
`;

const ErrorMessage = styled(motion.div)`
  background: ${props => props.theme.colors.error};
  color: white;
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  margin-bottom: ${props => props.theme.spacing.lg};
  display: flex;
  align-items: center;
  gap: ${props => props.theme.spacing.sm};
`;

const LoadingSpinner = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${props => props.theme.spacing.xl};
`;

const QuickQuestions = styled.div`
  margin-bottom: ${props => props.theme.spacing.xl};
`;

const QuickQuestionTitle = styled.h3`
  font-size: 1.5rem;
  font-weight: 600;
  color: ${props => props.theme.colors.text};
  margin-bottom: ${props => props.theme.spacing.lg};
  text-align: center;
`;

const QuickQuestionsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: ${props => props.theme.spacing.md};
`;

const QuickQuestionButton = styled(motion.button)`
  background: ${props => props.theme.colors.surface};
  border: 2px solid ${props => props.theme.colors.border};
  padding: ${props => props.theme.spacing.md};
  border-radius: ${props => props.theme.borderRadius.md};
  text-align: left;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    border-color: ${props => props.theme.colors.primary};
    background: ${props => props.theme.colors.background};
  }
`;

const QuickQuestionText = styled.p`
  color: ${props => props.theme.colors.text};
  font-weight: 500;
  margin: 0;
`;

const TutorPage = () => {
  const [question, setQuestion] = useState('');
  const [context, setContext] = useState('');
  const [userLevel, setUserLevel] = useState('beginner');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const quickQuestions = [
    "Apa maksud asuransi?",
    "Jelaskan tentang subsidi energi",
    "Apa itu investasi?",
    "Bagaimana cara mengisi formulir online?",
    "Apa perbedaan antara tabungan dan investasi?"
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!question.trim()) {
      setError('Silakan masukkan pertanyaan Anda');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await tutorService.askQuestion({
        question: question.trim(),
        context: context.trim() || null,
        user_level: userLevel
      });

      setResult(response);
    } catch (err) {
      setError('Terjadi kesalahan saat memproses pertanyaan. Silakan coba lagi.');
      console.error('Error:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleQuickQuestion = (quickQuestion) => {
    setQuestion(quickQuestion);
    setContext('');
  };

  return (
    <PageContainer>
      <PageTitle>
        <FaQuestionCircle style={{ marginRight: '0.5rem', color: '#4F46E5' }} />
        AI Tutor
      </PageTitle>

      <QuickQuestions>
        <QuickQuestionTitle>Pertanyaan Cepat</QuickQuestionTitle>
        <QuickQuestionsGrid>
          {quickQuestions.map((quickQuestion, index) => (
            <QuickQuestionButton
              key={index}
              onClick={() => handleQuickQuestion(quickQuestion)}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <QuickQuestionText>{quickQuestion}</QuickQuestionText>
            </QuickQuestionButton>
          ))}
        </QuickQuestionsGrid>
      </QuickQuestions>

      <FormContainer>
        <form onSubmit={handleSubmit}>
          <FormGroup>
            <Label htmlFor="question">Pertanyaan Anda</Label>
            <TextArea
              id="question"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Tanyakan apapun yang ingin Anda ketahui. Contoh: 'Apa maksud kata asuransi?' atau 'Bagaimana cara mengisi formulir online?'"
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="context">Konteks (Opsional)</Label>
            <TextArea
              id="context"
              value={context}
              onChange={(e) => setContext(e.target.value)}
              placeholder="Berikan konteks tambahan jika diperlukan..."
            />
          </FormGroup>

          <FormGroup>
            <Label htmlFor="level">Tingkat Pemahaman</Label>
            <Select
              id="level"
              value={userLevel}
              onChange={(e) => setUserLevel(e.target.value)}
            >
              <option value="beginner">Pemula</option>
              <option value="intermediate">Menengah</option>
              <option value="advanced">Lanjutan</option>
            </Select>
          </FormGroup>

          <Button
            type="submit"
            disabled={loading || !question.trim()}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? <FaSpinner className="fa-spin" /> : <FaQuestionCircle />}
            {loading ? 'Memproses...' : 'Tanyakan'}
          </Button>
        </form>
      </FormContainer>

      <AnimatePresence>
        {error && (
          <ErrorMessage
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <FaExclamationTriangle />
            {error}
          </ErrorMessage>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {loading && (
          <LoadingSpinner
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <FaSpinner className="fa-spin" style={{ fontSize: '2rem', color: '#4F46E5' }} />
          </LoadingSpinner>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {result && (
          <ResultContainer
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
          >
            <ResultHeader>
              <FaCheckCircle style={{ color: '#10B981' }} />
              <ResultTitle>Jawaban AI Tutor</ResultTitle>
            </ResultHeader>

            <AnswerSection>
              <AnswerText>{result.answer}</AnswerText>
            </AnswerSection>

            <ExplanationSection>
              <SectionTitle>
                <FaLightbulb />
                Penjelasan Detail
              </SectionTitle>
              <ExplanationText>{result.explanation}</ExplanationText>
            </ExplanationSection>

            {result.examples && result.examples.length > 0 && (
              <ExplanationSection>
                <SectionTitle>
                  <FaBook />
                  Contoh
                </SectionTitle>
                <ExamplesList>
                  {result.examples.map((example, index) => (
                    <ExampleItem key={index}>{example}</ExampleItem>
                  ))}
                </ExamplesList>
              </ExplanationSection>
            )}

            {result.related_concepts && result.related_concepts.length > 0 && (
              <ExplanationSection>
                <SectionTitle>Konsep Terkait</SectionTitle>
                <RelatedConcepts>
                  {result.related_concepts.map((concept, index) => (
                    <ConceptTag key={index}>{concept}</ConceptTag>
                  ))}
                </RelatedConcepts>
              </ExplanationSection>
            )}

            <ExplanationSection>
              <SectionTitle>Tingkat Kepercayaan</SectionTitle>
              <div>
                <div style={{ fontSize: '0.875rem', color: '#6B7280', marginBottom: '0.5rem' }}>
                  {(result.confidence_score * 100).toFixed(0)}% yakin dengan jawaban ini
                </div>
                <ConfidenceBar>
                  <ConfidenceFill confidence={result.confidence_score} />
                </ConfidenceBar>
              </div>
            </ExplanationSection>
          </ResultContainer>
        )}
      </AnimatePresence>
    </PageContainer>
  );
};

export default TutorPage;
