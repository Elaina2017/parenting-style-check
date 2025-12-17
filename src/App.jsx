import React, { useState } from 'react';
import { Heart, AlertCircle, CheckCircle, Book, RotateCcw, Sparkles, Loader } from 'lucide-react';

const ParentingStyleAssessment = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [showResults, setShowResults] = useState(false);
  const [aiAnalysis, setAiAnalysis] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const questions = [
    // 따뜻함 & 반응성
    { id: 'Q1', dimension: 'warmth', text: '아이가 힘들어할 때, 먼저 아이의 감정을 물어보고 공감해줍니다.', reverse: false },
    { id: 'Q2', dimension: 'warmth', text: '아이에게 하루에 여러 번 애정 표현(포옹, 칭찬 등)을 합니다.', reverse: false },
    { id: 'Q3', dimension: 'warmth', text: '아이와 함께 웃고 즐거운 시간을 보내는 것을 중요하게 생각합니다.', reverse: false },
    { id: 'Q4', dimension: 'warmth', text: '아이가 성취했을 때 구체적으로 칭찬해줍니다.', reverse: false },
    
    // 명확한 규칙
    { id: 'Q5', dimension: 'rules', text: '우리 집에는 아이가 지켜야 할 명확한 규칙들이 있습니다.', reverse: false },
    { id: 'Q6', dimension: 'rules', text: '규칙을 정할 때 "왜 이 규칙이 필요한지" 아이에게 설명합니다.', reverse: false },
    { id: 'Q7', dimension: 'rules', text: '아이가 규칙을 어겼을 때 그냥 넘어가는 경우가 많습니다.', reverse: true },
    { id: 'Q8', dimension: 'rules', text: '중요한 규칙에 대해서는 협상하지 않고 지키도록 합니다.', reverse: false },
    
    // 자율성 존중
    { id: 'Q9', dimension: 'autonomy', text: '아이가 스스로 선택할 수 있는 기회를 자주 줍니다.', reverse: false },
    { id: 'Q10', dimension: 'autonomy', text: '아이의 의견을 물어보고 가족 결정에 반영합니다.', reverse: false },
    { id: 'Q11', dimension: 'autonomy', text: '아이가 실수하더라도 스스로 해볼 기회를 줍니다.', reverse: false },
    { id: 'Q12', dimension: 'autonomy', text: '내가 옳다고 생각하는 방법을 아이에게 따르게 합니다.', reverse: true },
    
    // 일관성
    { id: 'Q13', dimension: 'consistency', text: '같은 행동에 대해 매번 비슷하게 반응합니다.', reverse: false },
    { id: 'Q14', dimension: 'consistency', text: '피곤하거나 스트레스 받을 때 평소보다 엄격해집니다.', reverse: true },
    { id: 'Q15', dimension: 'consistency', text: '배우자/가족과 양육 방침이 일치합니다.', reverse: false },
    { id: 'Q16', dimension: 'consistency', text: '기분에 따라 허용하는 것과 안 되는 것이 달라집니다.', reverse: true },
    
    // 소통 & 경청
    { id: 'Q17', dimension: 'communication', text: '아이가 말할 때 하던 일을 멈추고 집중해서 듣습니다.', reverse: false },
    { id: 'Q18', dimension: 'communication', text: '아이의 생각이나 감정에 대해 자주 이야기를 나눕니다.', reverse: false },
    { id: 'Q19', dimension: 'communication', text: '아이가 잘못했을 때 설명할 기회를 주지 않고 바로 혼냅니다.', reverse: true },
    { id: 'Q20', dimension: 'communication', text: '아이에게 "왜 그렇게 생각해?" 같은 질문을 자주 합니다.', reverse: false },
    
    // 통제 & 요구
    { id: 'Q21', dimension: 'control', text: '아이의 하루 일과를 세세하게 관리합니다.', reverse: false },
    { id: 'Q22', dimension: 'control', text: '아이가 내 말에 순종하기를 기대합니다.', reverse: false },
    { id: 'Q23', dimension: 'control', text: '아이의 친구나 활동을 제한하는 편입니다.', reverse: false },
    
    // 반응성 추가
    { id: 'Q24', dimension: 'responsiveness', text: '아이가 도움을 요청하면 즉시 반응합니다.', reverse: false },
    { id: 'Q25', dimension: 'responsiveness', text: '아이의 작은 변화나 기분을 잘 알아챕니다.', reverse: false },
  ];

  const scaleOptions = [
    { value: 1, label: '전혀 그렇지 않다' },
    { value: 2, label: '그렇지 않다' },
    { value: 3, label: '보통이다' },
    { value: 4, label: '그렇다' },
    { value: 5, label: '매우 그렇다' },
  ];

  const handleAnswer = (value) => {
    const newAnswers = { ...answers, [questions[currentQuestion].id]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 200);
    } else {
      setShowResults(true);
    }
  };

  const calculateScores = () => {
    const dimensions = {
      warmth: [],
      rules: [],
      autonomy: [],
      consistency: [],
      communication: [],
      control: [],
      responsiveness: []
    };

    questions.forEach(q => {
      const answer = answers[q.id];
      if (answer) {
        const score = q.reverse ? (6 - answer) : answer;
        dimensions[q.dimension].push(score);
      }
    });

    const avgScores = {};
    Object.keys(dimensions).forEach(dim => {
      const scores = dimensions[dim];
      avgScores[dim] = scores.length > 0 
        ? Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 20) 
        : 0;
    });

    // 반응성 = 따뜻함 + 소통 + 반응성
    const responsiveness = Math.round(
      (avgScores.warmth + avgScores.communication + avgScores.responsiveness) / 3
    );

    // 요구성 = 규칙 + 통제 - 자율성
    const demandingness = Math.round(
      (avgScores.rules + avgScores.control + (100 - avgScores.autonomy)) / 3
    );

    return {
      responsiveness,
      demandingness,
      warmth: avgScores.warmth,
      rules: avgScores.rules,
      autonomy: avgScores.autonomy,
      consistency: avgScores.consistency,
      communication: avgScores.communication
    };
  };

  const getParentingType = (resp, dem, scores) => {
    // 권위적 양육 (반응성 ≥65, 요구성 ≥65)
    if (resp >= 65 && dem >= 65) {
      if (resp >= 80) return 'authoritative-warmth';
      if (dem >= 80) return 'authoritative-rules';
      return 'authoritative-balanced';
    }
    
    // 권위주의적 양육 (반응성 <65, 요구성 ≥65)
    if (resp < 65 && dem >= 65) {
      if (dem >= 80) return 'authoritarian-strict';
      return 'authoritarian-discipline';
    }
    
    // 허용적 양육 (반응성 ≥65, 요구성 <65)
    if (resp >= 65 && dem < 65) {
      if (resp >= 80 || scores.consistency < 60) return 'permissive-protective';
      return 'permissive-autonomous';
    }
    
    // 방임적 양육 (반응성 <65, 요구성 <65)
    if (resp < 50 && dem < 50) return 'uninvolved-low';
    return 'uninvolved-passive';
  };

  // 마크다운 **텍스트**를 볼드로 변환하는 함수
  const renderMarkdown = (text) => {
    const parts = text.split(/(\*\*.*?\*\*)/g);
    return parts.map((part, index) => {
      if (part.startsWith('**') && part.endsWith('**')) {
        const boldText = part.slice(2, -2);
        return <strong key={index} className="font-bold">{boldText}</strong>;
      }
      return part;
    });
  };

  const parentingTypes = {
    'authoritative-warmth': {
      mainName: '권위적 양육',
      subName: '따뜻함 강조형',
      nameEng: 'Authoritative - Warmth-Focused',
      color: 'emerald',
      image: '/images/authoritative-warmth.png',
      summary: '높은 반응성으로 아이에게 풍부한 애정을 표현하면서도 명확한 규칙을 제시하는 양육스타일이에요.'
    },
    'authoritative-rules': {
      mainName: '권위적 양육',
      subName: '규칙 강조형',
      nameEng: 'Authoritative - Rules-Focused',
      color: 'emerald',
      image: '/images/authoritative-rules.png',
      summary: '명확한 규칙과 기대를 중시하면서도 따뜻한 애정을 함께 표현하는 양육스타일이에요.'
    },
    'authoritative-balanced': {
      mainName: '권위적 양육',
      subName: '균형형',
      nameEng: 'Authoritative - Balanced',
      color: 'emerald',
      image: '/images/authoritative-balanced.png',
      summary: '따뜻함과 명확한 규칙이 조화를 이루는 이상적인 양육스타일이에요.'
    },
    'authoritarian-strict': {
      mainName: '권위주의적 양육',
      subName: '엄격한 통제형',
      nameEng: 'Authoritarian - Strict Control',
      color: 'blue',
      image: '/images/authoritarian-strict.png',
      summary: '높은 기대와 엄격한 통제를 중시하는 양육스타일이에요.'
    },
    'authoritarian-discipline': {
      mainName: '권위주의적 양육',
      subName: '규율 중시형',
      nameEng: 'Authoritarian - Discipline-Focused',
      color: 'blue',
      image: '/images/authoritarian-discipline.png',
      summary: '규율과 순종을 중요하게 생각하는 양육스타일이에요.'
    },
    'permissive-protective': {
      mainName: '허용적 양육',
      subName: '과보호형',
      nameEng: 'Permissive - Protective',
      color: 'pink',
      image: '/images/permissive-protective.png',
      summary: '높은 반응성으로 아이를 보호하지만 일관된 규칙 설정이 어려운 양육스타일이에요.'
    },
    'permissive-autonomous': {
      mainName: '허용적 양육',
      subName: '자율 존중형',
      nameEng: 'Permissive - Autonomous',
      color: 'pink',
      image: '/images/permissive-autonomous.png',
      summary: '아이의 자율성을 존중하며 따뜻하게 대하는 양육스타일이에요.'
    },
    'uninvolved-low': {
      mainName: '방임적 양육',
      subName: '낮은 참여형',
      nameEng: 'Uninvolved - Low Engagement',
      color: 'gray',
      image: '/images/uninvolved-low.png',
      summary: '아이에 대한 관심과 개입이 적은 양육스타일이에요.'
    },
    'uninvolved-passive': {
      mainName: '방임적 양육',
      subName: '소극적 관찰형',
      nameEng: 'Uninvolved - Passive Observer',
      color: 'gray',
      image: '/images/uninvolved-passive.png',
      summary: '아이를 관찰하지만 적극적인 개입이 부족한 양육스타일이에요.'
    }
  };

  const generateAIAnalysis = async () => {
    setIsAnalyzing(true);
    
    const scores = calculateScores();
    const type = getParentingType(scores.responsiveness, scores.demandingness, scores);
    
    // 응답 패턴 분석을 위한 데이터
    const responsePatterns = questions.map(q => ({
      question: q.text,
      answer: answers[q.id],
      dimension: q.dimension
    }));

    const prompt = `당신은 아동발달 전문가입니다. 다음 양육스타일 검사 결과를 분석해주세요.

**분석 지침:**
- 존댓말(~요체) 사용
- 따뜻하고 공감적인 톤
- 점수 숫자는 언급하지 말 것
- 3-4개 문단으로 상세하게 (각 300-400자)
- 객관적이고 전문적인 분석
- 구체적인 응답 예시를 인용하며 설명
- 전문용어는 쉽게 풀어서 설명

**주 양육 유형:** ${parentingTypes[type].mainName} - ${parentingTypes[type].subName}

**차원별 특징:**
- 반응성: ${scores.responsiveness > 70 ? '높음' : scores.responsiveness > 50 ? '보통' : '낮음'}
- 요구성: ${scores.demandingness > 70 ? '높음' : scores.demandingness > 50 ? '보통' : '낮음'}
- 따뜻함: ${scores.warmth > 70 ? '높음' : scores.warmth > 50 ? '보통' : '낮음'}
- 명확한 규칙: ${scores.rules > 70 ? '높음' : scores.rules > 50 ? '보통' : '낮음'}
- 자율성 존중: ${scores.autonomy > 70 ? '높음' : scores.autonomy > 50 ? '보통' : '낮음'}
- 일관성: ${scores.consistency > 70 ? '높음' : scores.consistency > 50 ? '보통' : '낮음'}
- 소통: ${scores.communication > 70 ? '높음' : scores.communication > 50 ? '보통' : '낮음'}

**주요 응답 패턴:**
${responsePatterns.filter(p => p.answer === 5 || p.answer === 1).slice(0, 5).map(p => 
  `- "${p.question}" → ${p.answer === 5 ? '매우 그렇다' : '전혀 그렇지 않다'}`
).join('\n')}

다음 구조로 분석해주세요:

**1문단:** 주 양육 유형 소개와 전반적인 특징 설명
**2문단:** 특히 두드러지는 강점을 구체적 응답 예시와 함께 설명
**3문단:** 주의가 필요한 부분을 구체적 응답 예시와 함께 설명하되, 비판보다는 개선 방향 제시
**4문단:** 이 양육스타일이 아이 발달에 미치는 영향과 전반적인 격려

각 문단은 자연스럽게 연결되어야 하며, 부모가 읽었을 때 자신의 양육을 객관적으로 이해하고 실천 가능한 인사이트를 얻을 수 있어야 합니다.`;

    try {
      const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt: prompt
        })
      });

      const data = await response.json();
      const analysisText = data.content?.find(item => item.type === 'text')?.text || '분석을 생성하는 중 오류가 발생했습니다.';
      
      setAiAnalysis(analysisText);
    } catch (error) {
      console.error('AI 분석 오류:', error);
      setAiAnalysis('분석을 생성하는 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const DimensionBar = ({ label, value, color }) => (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm font-medium text-gray-700">{label}</span>
        <span className="text-sm font-semibold text-gray-900">{value}%</span>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-3">
        <div
          className={`h-3 rounded-full transition-all duration-500`}
          style={{ 
            width: `${value}%`,
            backgroundColor: color === 'emerald' ? '#10b981' :
                           color === 'blue' ? '#3b82f6' :
                           color === 'pink' ? '#ec4899' : '#6b7280'
          }}
        />
      </div>
    </div>
  );

  if (showResults) {
    const scores = calculateScores();
    const type = getParentingType(scores.responsiveness, scores.demandingness, scores);
    const currentType = parentingTypes[type];

    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
        <div className="max-w-4xl mx-auto">
          <div className={`bg-gradient-to-br from-${currentType.color}-50 to-${currentType.color}-100 rounded-3xl shadow-2xl overflow-hidden`}>
            
            {/* 헤더 */}
            <div className="relative p-8 md:p-12 text-center">
              {/* 일러스트 위치: 상단 배경 이미지 */}
              <div className="absolute top-0 right-0 w-48 h-48 opacity-50">
                <img 
                  src={currentType.image} 
                  className="w-full h-full object-contain" 
                  alt={`${currentType.mainName} ${currentType.subName}`}
                  onError={(e) => {
                    // 이미지 로드 실패 시 기본 배경
                    e.target.style.display = 'none';
                  }}
                />
              </div>

              <div className="relative z-10">
                <div className="inline-block px-6 py-2 bg-white/80 rounded-full mb-4">
                  <p className="text-sm font-medium text-gray-600">부모님의 양육스타일</p>
                </div>
                
                <h1 className={`text-4xl md:text-5xl font-bold text-${currentType.color}-800 mb-2`}>
                  {currentType.mainName}
                </h1>
                <h2 className={`text-2xl md:text-3xl font-semibold text-${currentType.color}-700 mb-3`}>
                  - {currentType.subName}
                </h2>
                <p className="text-lg text-gray-700 mb-6">{currentType.nameEng}</p>
                
                <p className="text-lg text-gray-700 max-w-2xl mx-auto">
                  {currentType.summary}
                </p>
              </div>
            </div>

            {/* 2차원 그래프 */}
            <div className="bg-white mx-6 md:mx-12 mb-8 p-8 rounded-2xl shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">📊 양육 차원 분석</h2>
              
              <div className="relative w-full max-w-md mx-auto aspect-square bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl p-8">
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6">
                  <span className="text-sm font-semibold text-gray-600">높은 반응성</span>
                </div>
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-6">
                  <span className="text-sm font-semibold text-gray-600">낮은 반응성</span>
                </div>
                <div className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 rotate-[-90deg]">
                  <span className="text-sm font-semibold text-gray-600">낮은 요구성</span>
                </div>
                <div className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 rotate-90">
                  <span className="text-sm font-semibold text-gray-600">높은 요구성</span>
                </div>

                <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-300"></div>
                <div className="absolute top-0 bottom-0 left-1/2 w-px bg-gray-300"></div>

                <div
                  className="absolute w-6 h-6 rounded-full border-4 border-white shadow-lg transform -translate-x-1/2 -translate-y-1/2"
                  style={{
                    left: `${scores.demandingness}%`,
                    top: `${100 - scores.responsiveness}%`,
                    backgroundColor: currentType.color === 'emerald' ? '#10b981' :
                                   currentType.color === 'blue' ? '#3b82f6' :
                                   currentType.color === 'pink' ? '#ec4899' : '#6b7280'
                  }}
                >
                  <div className="absolute -top-8 left-1/2 -translate-x-1/2 text-white px-3 py-1 rounded-full text-xs font-bold whitespace-nowrap"
                       style={{
                         backgroundColor: currentType.color === 'emerald' ? '#10b981' :
                                        currentType.color === 'blue' ? '#3b82f6' :
                                        currentType.color === 'pink' ? '#ec4899' : '#6b7280'
                       }}>
                    현재 위치
                  </div>
                </div>

                <div className="absolute top-4 right-4 text-xs text-gray-400">권위적</div>
                <div className="absolute top-4 left-4 text-xs text-gray-400">허용적</div>
                <div className="absolute bottom-4 right-4 text-xs text-gray-400">권위주의적</div>
                <div className="absolute bottom-4 left-4 text-xs text-gray-400">방임적</div>
              </div>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">반응성</p>
                  <p className="text-3xl font-bold text-gray-800">{scores.responsiveness}%</p>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-xl">
                  <p className="text-sm text-gray-600 mb-1">요구성</p>
                  <p className="text-3xl font-bold text-gray-800">{scores.demandingness}%</p>
                </div>
              </div>
            </div>

            {/* AI 분석 섹션 */}
            <div className="bg-white mx-6 md:mx-12 mb-8 p-8 rounded-2xl shadow-lg border-4 border-purple-200">
              <div className="flex items-center gap-3 mb-6">
                <Sparkles className="w-8 h-8 text-purple-600" />
                <h2 className="text-2xl font-bold text-gray-800">심층해설</h2>
              </div>

              {!aiAnalysis && !isAnalyzing && (
                <div className="text-center py-8">
                  <p className="text-gray-600 mb-6">
                    검사 응답을 바탕으로 완전히 개인화된 상세 분석을 받아보세요.
                  </p>
                  <button
                    onClick={generateAIAnalysis}
                    className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
                  >
                    <Sparkles className="w-5 h-5" />
                    심층해설 보기
                  </button>
                </div>
              )}

              {isAnalyzing && (
                <div className="text-center py-12">
                  <Loader className="w-12 h-12 text-purple-600 animate-spin mx-auto mb-4" />
                  <p className="text-gray-600">분석 중입니다.</p>
                  <p className="text-sm text-gray-500 mt-2">약 10초 정도 소요됩니다</p>
                </div>
              )}

              {aiAnalysis && (
                <div className="prose prose-lg max-w-none">
                  <div className="bg-purple-50 p-6 rounded-xl">
                    {aiAnalysis.split('\n\n').map((paragraph, idx) => (
                      <p key={idx} className="text-gray-800 leading-relaxed mb-4 last:mb-0">
                        {renderMarkdown(paragraph)}
                      </p>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* 차원별 점수 */}
            {aiAnalysis && (
              <>
                <div className="bg-white mx-6 md:mx-12 mb-8 p-8 rounded-2xl shadow-lg">
                  <h2 className="text-2xl font-bold text-gray-800 mb-6">📈 세부 차원 분석</h2>
                  <DimensionBar label="따뜻함 & 애정표현" value={scores.warmth} color={currentType.color} />
                  <DimensionBar label="명확한 규칙 설정" value={scores.rules} color={currentType.color} />
                  <DimensionBar label="자율성 존중" value={scores.autonomy} color={currentType.color} />
                  <DimensionBar label="일관성" value={scores.consistency} color={currentType.color} />
                  <DimensionBar label="소통과 경청" value={scores.communication} color={currentType.color} />
                </div>
              </>
            )}

            <div className="p-8 text-center">
              <button
                onClick={() => {
                  setShowResults(false);
                  setCurrentQuestion(0);
                  setAnswers({});
                  setAiAnalysis(null);
                }}
                className="bg-white text-gray-800 px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all flex items-center gap-3 mx-auto"
              >
                <RotateCcw className="w-5 h-5" />
                다시 검사하기
              </button>
            </div>

          </div>
        </div>
      </div>
    );
  }

  const progress = ((currentQuestion + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8">
            <div className="flex justify-center mb-4">
              <img
                src="/images/logo.png" 
                alt="SAiU 로고"
                className="h-20 mb-2"
              />
            </div>
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-bold text-gray-800">부모 양육스타일 검사</h1>
              <span className="text-sm text-gray-500">{currentQuestion + 1} / {questions.length}</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-purple-500 to-pink-500 h-2 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>

          <div className="mb-8 p-6 bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl">
            <p className="text-lg text-gray-800 leading-relaxed">
              {questions[currentQuestion].text}
            </p>
          </div>

          <div className="space-y-3">
            {scaleOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => handleAnswer(option.value)}
                className="w-full p-4 text-left rounded-lg border-2 border-gray-200 hover:border-purple-500 hover:bg-purple-50 transition-all"
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full border-2 border-gray-300 flex items-center justify-center mr-3">
                    <span className="text-sm font-semibold text-gray-600">{option.value}</span>
                  </div>
                  <span className="text-gray-700">{option.label}</span>
                </div>
              </button>
            ))}
          </div>

          {/* 이전 버튼 */}
          {currentQuestion > 0 && (
            <div className="mt-6 text-center">
              <button
                onClick={() => setCurrentQuestion(currentQuestion - 1)}
                className="px-6 py-2 text-gray-600 hover:text-gray-800 font-medium transition-colors"
              >
                ← 이전 문항으로
              </button>
            </div>
          )}

          <div className="mt-6 p-4 bg-blue-50 rounded-lg">
            <p className="text-sm text-gray-600">
              💡 평소 아이를 대할 때의 모습을 떠올리며 솔직하게 답해주세요.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentingStyleAssessment;
