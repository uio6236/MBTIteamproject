export default function RecommendSports() {
  const sports = [
    {
      title: "요가",
      description: "호흡과 명상을 기반으로 하는 운동인 요가는 근육의 유연성과 가동범위를 늘려줄 뿐만 아니라 신경의 안정과 스트레스 감소에도 효과적이에요.",
      image: "/images/yoga.png"
    },
    {
      title: "필라테스",
      description: "정적인 근력 운동인 필라테스는 코어의 안정성과 유연성을 동시에 요구하며 몸의 깊은 곳의 근육을 기를 수 있는 운동입니다.",
      image: "/images/pilates.png"
    },
    {
      title: "수영",
      description: "물속에서의 고요함과 릴렉스를 느껴보세요! 수영은 부상의 위험이 적으며 여러 부위의 근육을 동시에 자극하는 전신 유산소 운동이에요.",
      image: "/images/swimming.png"
    },
    {
      title: "발레",
      description: "우아해 보이는 예술 중 하나인 발레는 자세 교정, 유연성, 집중력 모두 갖춘 운동. 고도의 몸의 표현과 지세변화뿐만 아니라 감성까지 자극합니다.",
      image: "/images/ballet.png"
    }
  ];

  return (
    <div className="p-4 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-center text-lg font-bold mb-2">
        <span className="text-blue-600">박현성</span>님과 같은 <strong>INFP</strong>에게 추천하는 운동!
      </h1>
      <p className="text-center text-sm mb-4 text-gray-600">
        INFP인 박현성님은 주로 스스로를 돌볼 수 있고<br />
        과정에 집중할 수 있는 운동을 먼저 추천드려요 :)
      </p>

      <div className="space-y-4">
        {sports.map((sport) => (
          <div key={sport.title} className="flex items-start bg-gray-50 rounded-xl p-3 shadow-sm">
            <img
              src={sport.image}
              alt={sport.title}
              className="w-16 h-16 rounded-lg mr-4 object-cover"
            />
            <div className="flex-1">
              <h3 className="font-semibold">{sport.title}</h3>
              <p className="text-sm text-gray-600">{sport.description}</p>
            </div>
            <div className="ml-2 mt-1">
            <img
              src="/images/heart.png"
              alt="heart"
              className="w-5 h-5 mt-1"
            />

            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
