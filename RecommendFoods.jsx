export default function RecommendFoods() {
  const foods = [
    {
      name: "닭백숙",
      kcal: 450,
      description: "고단백 식품으로 유명한 닭백숙은 면역력 향상과 피로회복에도 좋아요.",
      image: "/images/chicken.png"
    },
    {
      name: "고등어 구이",
      kcal: 250,
      description: "뇌 기능 향상에 도움되는 불포화 오메가-3와 단백질이 풍부해요.",
      image: "/images/mackerel.png"
    },
    {
      name: "굴국밥",
      kcal: 420,
      description: "겨울철 대표 보양식 귤국밥! 어묵으로 면역력 강화와 원기회복을 도와요.",
      image: "/images/gullsoup.png"
    },
    {
      name: "현미밥",
      kcal: 320,
      description: "현미밥은 흰쌀밥보다 식이섬유가 풍부하고 GI지수가 낮아 혈당 조절에 좋아요.",
      image: "/images/brown_rice.png"
    }
  ];

  return (
    <div className="p-4 max-w-md mx-auto bg-white min-h-screen">
      <h1 className="text-center text-lg font-bold mb-2">
        <span className="text-blue-600">박현성</span>님,
        <br />
        오늘은 이런 건강식 어떠세요?
      </h1>
      <p className="text-center text-sm mb-4 text-gray-600">
        부담 없이 즐길 수 있는 영양 가득한 식단을 준비했어요! <br />
        소소하지만 확실한 건강을 함께 챙겨볼까요? :)
      </p>

      <div className="space-y-4">
        {foods.map((food) => (
          <div key={food.name} className="flex items-start bg-gray-50 rounded-xl p-3 shadow-sm">
            <img
              src={food.image}
              alt={food.name}
              className="w-16 h-16 rounded-lg mr-4 object-cover"
            />
            <div className="flex-1">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">{food.name}</h3>
                <span className="text-xs text-gray-600">{food.kcal}Kcal</span>
              </div>
              <p className="text-sm text-gray-600">{food.description}</p>
            </div>
            <div className="ml-2 mt-1">
              <img src="/images/heart.png" alt="like" className="w-5 h-5" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}