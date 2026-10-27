import { h, render, Component } from './preact.module.js';
import htm from './htm.module.js';
const html = htm.bind(h);



const A = {
  icon:"sample_sprite_icon.png", chibi:"sample_sprite_chibi.png",
  back:"sample_sprite_back.png", house:"sample_sprite_house.png",
  pa:"sample_portrait_a.png", pb:"sample_portrait_b.png",
  lowsta:"sample_low_stamina.png", lowrea:"sample_low_reason.png",
  ritual:"sample_ritual_mask.png", karu:"sample_karukosa_mask.png",
  cursed:"sample_cursed_signs.png", nose:"sample_broken_nose.png",
  slit:"sample_slit_mouth.png", insmasu:"sample_insmasu_look.png"
};
const BLANK = "data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7";
const SAMPLE_IMG = { sprite_icon: A.icon, sprite_chibi: A.chibi, sprite_back: A.back, sprite_house: A.house, portrait_a: A.pa, portrait_b: A.pb,
  low_stamina: A.lowsta, low_reason: A.lowrea, ritual_mask: A.ritual, karukosa_mask: A.karu, cursed_signs: A.cursed, broken_nose: A.nose,
  insmasu_look: A.insmasu, slit_mouth: A.slit };
const SAMPLE_INFO = { name:"미미르", author:"백만", contact:"백만", tag:"테스트", na:"테스트 A", nb:"테스트 B",
  desc:"테스트용 예시 캐릭터입니다.\n그림·퍽·보너스 구성을 살펴보는 데 쓰세요." };
const BLANK_INFO = { name:"", author:"", contact:"", tag:"", na:"", nb:"", desc:"" };
const DEFAULT_STATS = { strength:7, dexterity:7, perception:7, charisma:6, knowledge:6, luck:6 };
const SAVE_FIELDS = ["info","stats","packA","packB","bonusA","bonusB","folder","layers","live","activeLayer","exportLang","unlocked","extraIto","pathMap"];
const SLOTS = [
  {key:"sprite_icon",label:"아이콘",w:18,h:18,src:null,group:"sprite",note:"18×18. 가장자리 투명 처리가 적용되지 않습니다.",tip:"캐릭터 선택 화면에 쓰이는 작은 아이콘입니다. 유일하게 가장자리 투명 처리가 적용되지 않습니다."},
  {key:"sprite_chibi",label:"치비",w:105,h:57,src:null,group:"sprite",note:"아래 가장자리도 투명 처리됩니다. 빨간 점선 위로 띄워 그려주세요.",tip:"장소를 조사하러 나갈 때 나오는 작은 캐릭터입니다. 아래 가장자리도 투명 처리되니 몇 픽셀 띄워 그려주세요."},
  {key:"sprite_back",label:"뒷모습",w:256,h:288,src:null,group:"sprite",note:"256×288",tip:"미스터리 게시판을 볼 때와 등대 위에 설 때 보이는 뒷모습입니다."},
  {key:"sprite_house",label:"선택 화면 전신",w:171,h:214,src:null,group:"sprite",note:"세로 200px 미만이면 게임이 윗부분을 복사해 채웁니다.",tip:"집(아파트) 한가운데 서 있는 모습이자 캐릭터 선택 화면의 전신입니다. 세로 200px 미만이면 게임이 윗부분을 복사해 채웁니다."},
  {key:"portrait_a",label:"초상화 A",w:195,h:164,src:null,group:"sprite",note:"게임 오른쪽 패널과 옷장 거울에 표시됩니다.",tip:"오른쪽 능력치 패널과 옷장 거울에 나오는 기본 초상화입니다."},
  {key:"portrait_b",label:"초상화 B",w:195,h:164,src:null,group:"sprite",note:"비워 두면 두 번째 의상을 볼 때 게임이 종료됩니다.",tip:"옷장에서 고를 수 있는 두 번째 의상입니다. 비워 두면 두 번째 의상을 볼 때 게임이 종료됩니다."},
  {key:"low_stamina",label:"체력 없음",btn:"체력\n없음",w:195,h:164,src:null,group:"status",note:"체력이 10 미만일 때 표시됩니다.",tip:"체력이 10 미만으로 떨어지면 초상화 위에 겹쳐집니다."},
  {key:"low_reason",label:"이성 없음",btn:"이성\n없음",w:195,h:164,src:null,group:"status",note:"이성이 10 미만일 때 표시됩니다.",tip:"이성이 10 미만으로 떨어지면 초상화 위에 겹쳐집니다."},
  {key:"ritual_mask",label:"의식용 가면",btn:"의식용\n가면",w:195,h:164,src:null,group:"status",note:"RITUAL MASK 장착",tip:"B슬롯 장비 '의식용 가면'을 착용하면 표시됩니다. 상점에서 살 수 있는 가면입니다."},
  {key:"karukosa_mask",label:"'카루코사' 가면",btn:"\'카루코사\'\n가면",w:195,h:164,src:null,group:"status",note:"'KARUKOSA' MASK 장착",tip:"B슬롯 장비인 '카루코사' 가면을 착용하면 표시됩니다. 가면류 보상으로 얻을 수 있습니다."},
  {key:"crestfallen_mask",label:"낙담한 가면",btn:"낙담한\n가면",w:195,h:164,src:null,group:"status",note:"CRESTFALLEN MASK 장착",tip:"C슬롯 장비 '낙담한 가면'을 착용하면 표시됩니다. 게임을 진행하며 얻을 수 있는 장비입니다."},
  {key:"cursed_signs",label:"저주의 징조",btn:"저주의\n징조",w:195,h:164,src:null,group:"status",note:"CURSED SIGNS 저주",tip:"저주 '저주의 징조'에 걸리면 표시됩니다."},
  {key:"broken_nose",label:"부러진 코",btn:"부러진\n코",w:195,h:164,src:null,group:"status",note:"BROKEN NOSE 부상",tip:"경상 '부러진 코'를 입으면 표시됩니다."},
  {key:"insmasu_look",label:"인스마스의 형상",btn:"인스마스의\n형상",w:195,h:164,src:null,group:"status",note:"INSMASU CURSE 저주",tip:"'인스마스의 형상' 상태일 때 표시됩니다."},
  {key:"slit_mouth",label:"찢어진 입",btn:"찢어진\n입",w:195,h:164,src:null,group:"status",note:"SLIT MOUTH 부상",tip:"경상 '찢어진 입'을 입으면 표시됩니다."},
  {key:"hunger",label:"허기",btn:"허기",w:195,h:164,src:null,group:"status",note:"HUNGER 저주",tip:"저주 '허기'에 걸리면 표시됩니다."}
];
const PACKS = [
  ["SKILLED BUTCHER", "숙련된 도살자", "신선한 고기: 미스터리 완료 시 수상한 고기를 획득한다", "숫돌: [날붙이] 타입 무기로 입히는 피해량이 1 증가한다", 1, "FRESH MEAT", "SHARPENING STONE"],
  ["HOUNDED ARTIST", "쫓기는 예술가", "끔찍한 영감: 이성 감소 시 경험치를 얻는다", "잊혀지지 않는 꿈: 미스터리 완료 시 회복되는 이성이 증가한다", 1, "MORBID INSPIRATION", "HAUNTING DREAMS"],
  ["OBSESSIVE SHOPPER", "쇼핑 중독자", "신속한 쇼핑: 아이템 구매 시 파멸이 2% 감소한다", "큰손: 아이템 구매 시 일정 확률로 자금을 1 회복한다", 1, "QUICK SHOPPER", "BIG SPENDER"],
  ["TAROT READER", "타로 리더", "예지: 이벤트 옵션 선택 시 능력치 기반 타입이 표시된다", "별들이 제자리에: 모든 운 스킬 체크에 자동으로 성공한다", 1, "PREMONITION", "STARS ARE RIGHT"],
  ["INNER STRENGTH", "내면의 힘", "숙명: 최대 이성 +2 / 이성 +2", "인정사정 볼 것 없다: 최대 체력 +2 / 체력 +2", 1, "PREDESTINED", "UNRELENTING"],
  ["PUSHING YOURSELF", "자기 혹사", "생존 본능: 이성이 3 미만일 경우 모든 이벤트 스킬 체크를 통과한다", "즉흥적으로: 모든 이벤트 스킬 체크에 마이너스(-)가 붙는다. 대신 이벤트 스킬 통과 시 추가 경험치가 부여된다", 1, "SURVIVAL INSTINCT", "WINGING IT"],
  ["MAGIC CASTER", "마법 시전자", "유령 합체: 미스터리 완료 시 임의의 주문을 얻는다", "신비의 이해: 주문 슬롯이 2개 추가된다", 0, "GHOST CONNECTION", "ARCANE GRASP"],
  ["LONE WOLF", "고독한 늑대", "홀로서기: 아군이 없을 경우 모든 능력치 +1", "역경: 니코틴 러시 효과 발동 시 피해량 +1", 0, "ON YOUR OWN", "HARD-KNOCK"],
  ["ESCAPE ARTIST", "도망의 대가", "운동화: 전투에서 도주 시 받는 파멸 페널티가 감소한다", "은신: 전투 조우에서 빠져나올 때마다 경험치를 10 획득한다", 0, "RUNNING SHOES", "STEALTH"],
  ["CLOSE QUARTERS", "근접 격투", "능숙한 손놀림: 총기의 근접 공격 속도가 20% 상승한다", "근접전 훈련: 총기를 근접 무기로 사용할 경우 피해량이 증가한다", 0, "DEFT HANDLING", "CQC TRAINING"],
  ["MAFIA MEMBER", "마피아 조직원", "야쿠자 카드: 모든 상점에서 슬롯 하나를 추가로 사용할 수 있다 / 모든 아이템에서 [불법] 태그가 제거된다", "이레즈미: 상점의 아이템이 1 저렴해진다 / [최소치 1]", 0, "YAKUZA CARD", "IREZUMI"],
  ["MILITARY BACKGROUND", "군 복무 경력", "숨겨둔 탄약: 각 미스터리 종료 시 총알을 1-2 획득한다", "자제력: 모든 이벤트 스킬 체크에 성공할 경우 체력을 1 회복한다", 0, "AMMO STASH", "DISCIPLINE"],
  ["SPORTS STAR", "스포츠 스타", "빠른 수영 선수: 공격 행동이 빨라진다", "아빠바라기: 각 미스터리 종료 시 체력을 2 회복한다", 0, "FAST SWIMMER", "DADDY'S GIRL"],
  ["WITCH'S CHILD", "마녀의 아이", "두 번째 시선: 유령과 엘드리치 적에게 추가 피해를 입힌다", "오컬트 기호: 주문 시전 시 소량의 경험치를 획득한다", 0, "SECOND SIGHT", "OCCULT SIGNS"],
  ["ME TIME", "나만의 시간", "자가요법: 주문을 잊을 경우 회복되는 이성이 증가한다", "온수 목욕: 집에서 휴식 시 효과가 향상된다", 0, "SELF-THERAPY", "HOT BATH"],
  ["ANXIOUS ATHLETE", "초조한 운동선수", "코어 근력: 모든 전투 행동이 추가 피해를 입힌다", "빠른 손: 전투 조우 중 장비를 교체할 수 있다", 0, "CORE STRENGTH", "FAST HANDS"],
  ["AMATEUR DETECTIVE", "아마추어 탐정", "추론: 미스터리 완료 시 추가 경험치를 획득한다", "기자의 가방: 인벤토리에 슬롯이 추가된다", 0, "DEDUCTION", "REPORTER'S BAG"],
  ["PETTY THIEF", "좀도둑", "소매치기: 전투 후 아이템을 발견할 확률이 증가한다", "전리품: 쓰러트린 적마다 자금을 1 획득한다", 0, "PICKPOCKET", "LOOTING"],
  ["SERIAL KILLER", "연쇄살인마", "이미 망했어: 모든 이벤트 스킬 체크에 실패할 경우 이성을 1 회복한다", "해부학 수업: 인간 적에게 추가 피해를 입힌다", 0, "DOOMED ALREADY", "ANATOMY CLASS"],
  ["HOSPITAL STAFF", "병원 직원", "문일지십: 전투 중 피해를 입을 경우 소량의 경험치 보너스를 획득한다", "응급 처치: 적을 쓰러트리면 이성을 2 회복한다", 0, "FAST LEARNER", "FIRST AID"],
  ["HORROR WRITER", "공포소설 작가", "서명된 계약서: 미스터리 완료 시 추가 자금을 획득한다", "나의 기이한 수집품: 각 미스터리 종료 시 [오컬트] 태그를 가진 임의의 아이템을 획득한다", 0, "SIGNED CONTRACT", "MY WEIRD COLLECTION"],
  ["SMOOTH TALKER", "능숙한 이야기꾼", "임기응변: 전투 조우 중 아이템 투척 효과가 증가한다", "명성: 각 아군의 전투 행동 속도가 증가한다", 0, "IMPROVISE", "FAME"]
];
const BONUS_DB = {"item":[{"en":"'KARUKOSA' MASK","ko":"'카루코사' 가면","eff":"영적 행동이 빨라진다","sub":"장비 · B슬롯","lock":false},{"en":"DIY FLAMETHROWER","ko":"DIY 화염방사기","eff":"[빠른 장착 가능]","sub":"무기 · A슬롯","lock":false},{"en":"INSPIRING NOVEL","ko":"감동적인 소설","eff":"(사용 시): 현재 미스터리가 완료될 때까지 / 피해량 +2","sub":"소모품","lock":false},{"en":"KENDO HELMET","ko":"검도 보호구","eff":"전투 시 낮은 확률로 체력 감소를 무시한다","sub":"장비 · B슬롯","lock":false},{"en":"POLICE REVOLVER","ko":"경찰의 권총","eff":"[명중 시 피해량: 9]","sub":"총기 · A슬롯","lock":false},{"en":"MEAT CLEAVER","ko":"고기용 칼","eff":"칼날이 날카로워 아무리 질긴 고기라도 쉽게 자를 수 있다.","sub":"무기 · A슬롯","lock":false},{"en":"ANCIENT RING","ko":"고대의 반지","eff":"힘 +1 / 파멸 +5%","sub":"장비 · C슬롯","lock":false},{"en":"ARMY KNIFE","ko":"군용 단검","eff":"스테인리스 철제.","sub":"무기 · A슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"PRAYER BEADS","ko":"기도용 묵주","eff":"영적 행동이 빨라진다","sub":"장비 · C슬롯","lock":false},{"en":"GUITAR","ko":"기타","eff":"(인벤토리 소지 시): 휴식 시 이성 회복량 및 파멸이 증가한다","sub":"기타 · 캐릭터 전용","lock":true,"cond":"미쿠"},{"en":"LONG PIG STEAK","ko":"길쭉한 돈육 스테이크","eff":"(사용 시): 체력 +2 / 새로운 상태가 추가된다","sub":"소모품","lock":false},{"en":"BLACK HAIR","ko":"까만 머리카락","eff":"(사용 시): 반짇고리와 조합할 수 있다","sub":"기타","lock":false},{"en":"BROKEN BOTTLE","ko":"깨진 병","eff":"[빠른 장착 가능]","sub":"무기 · A슬롯","lock":false},{"en":"WOODEN BAT","ko":"나무 방망이","eff":"당신은 경고조로 휘두르며 전투에 임한다.","sub":"무기 · A슬롯","lock":false},{"en":"BRANCH","ko":"나뭇가지","eff":"[빠른 장착 가능]","sub":"무기 · A슬롯","lock":false},{"en":"SPIRAL HOOD","ko":"나선형 후드","eff":"힘/민첩 +2 / 인지 -2","sub":"장비 · C슬롯","lock":false},{"en":"COMPASS","ko":"나침반","eff":"조사한 지역마다 경험치 +2","sub":"장비 · C슬롯","lock":false},{"en":"CRESTFALLEN MASK","ko":"낙담한 가면","eff":"파멸 -10%","sub":"장비 · C슬롯","lock":false},{"en":"OLD SHOTGUN","ko":"낡은 산탄총","eff":"[명중 시 피해량: 15]","sub":"총기 · A슬롯 · 캐릭터 전용","lock":true,"cond":"모리코"},{"en":"RUSTY SICKLE","ko":"녹슨 낫","eff":"[낮은 확률로 1의 추가 피해를 입힌다]","sub":"무기 · A슬롯","lock":false},{"en":"PATINA RING","ko":"녹청 반지","eff":"민첩 +1 / 최대 체력 -2","sub":"장비 · C슬롯","lock":false},{"en":"CIGARETTES","ko":"담배","eff":"(사용 시): 이성 +1 / 새로운 상태가 추가된다","sub":"소모품","lock":false},{"en":"CIGARETTE CASE","ko":"담배 케이스","eff":"(인벤토리 소지 시): 지역 조사 후 15%의 확률로 담배 한 개비를 얻는다","sub":"기타 · 캐릭터 전용","lock":true,"cond":"하루"},{"en":"TAINTED VIOLIN","ko":"더럽혀진 바이올린","eff":"(장착 시):전투 행동 속도가 증가한다","sub":"장비 · C슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"LIBRARY BOOK","ko":"도서관 책","eff":"(사용 시): 경험치 +10","sub":"소모품","lock":false},{"en":"LIBRARY NOTES","ko":"도서관의 메모","eff":"(사용 시): 임의의 주문을 얻는다 / 이성이 1-2 감소한다","sub":"소모품","lock":false},{"en":"DUSTY GRIMOIRE","ko":"먼지 쌓인 마법서","eff":"(사용 시): 임의의 효과 / 소요: 이성 2","sub":"소모품","lock":false},{"en":"NICE RING","ko":"멋진 반지","eff":"(장비 시): 매력 +1 / (사용 시): 자금을 2 얻는다","sub":"장비 · C슬롯","lock":false},{"en":"MONKEY WRENCH","ko":"멍키 스패너","eff":"[무거운 공구]: 힘 -1","sub":"무기 · A슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"SCALPEL","ko":"메스","eff":"","sub":"무기 · A슬롯","lock":false},{"en":"CARPENTER HAMMER","ko":"목공용 망치","eff":"[적을 쓰러트린 후 낮은 확률로 잃어버린 체력을 회복한다]","sub":"무기 · A슬롯","lock":false},{"en":"GRUESOME TOTEM","ko":"무시무시한 토템","eff":"파멸 -10% / 최대 이성 -3","sub":"장비 · C슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"ROSARY","ko":"묵주","eff":"(장착 시): 믿음 +3 / 이성 +1","sub":"장비 · C슬롯 · 캐릭터 전용","lock":true,"cond":"야시로"},{"en":"MUMMIFIED HEART","ko":"미라의 심장","eff":"(사용 시): 흡혈귀 적을 쓰러트린다","sub":"소모품","lock":false},{"en":"SEMI-AUTO","ko":"반자동 권총","eff":"[명중 시 피해량: 7]","sub":"총기 · A슬롯 · 캐릭터 전용","lock":true,"cond":"하루"},{"en":"SEWING KIT","ko":"반짇고리","eff":"--장신구--","sub":"소모품","lock":false},{"en":"SEWING KIT (HAIR)","ko":"반짇고리 (머리카락)","eff":"(사용 시): 체력 +3 / 이성 +3","sub":"소모품","lock":false},{"en":"BACKPACK","ko":"배낭","eff":"인벤토리에 슬롯이 두 개 추가된다","sub":"장비 · B슬롯","lock":false},{"en":"BRICK","ko":"벽돌","eff":"","sub":"무기 · A슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"BOTTLE [WATER]","ko":"병 [물]","eff":"(사용 시): 체력 +1","sub":"소모품","lock":false},{"en":"BOTTLE [MILK]","ko":"병 [우유]","eff":"(사용 시): 체력 +1","sub":"소모품","lock":false},{"en":"BOTTLE [SLUDGE]","ko":"병 [진창]","eff":"던지면 추가 피해를 입힌다","sub":"기타","lock":false},{"en":"BOTTLE [BLOOD]","ko":"병 [피]","eff":"(사용 시): 피를 마신다 / [끓는 피로 가득 찼다]","sub":"소모품","lock":false},{"en":"TOME OF ROT","ko":"부패의 고서","eff":"(사용 시): 인간 적에게 8의 피해를 입힌다 / [새로운 상태가 추가된다]","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"BOOK STRAP","ko":"북 스트랩","eff":"전투 시 인벤토리 내 책 아이템 사용 속도 증가","sub":"장비 · C슬롯 · 캐릭터 전용","lock":true,"cond":"토시아키"},{"en":"MYSTERY YAKITORI","ko":"불가사의한 야키토리","eff":"(사용 시): 이성 +4, 체력 -1","sub":"소모품","lock":false},{"en":"BANDAGE","ko":"붕대","eff":"[인벤토리 소지 시 경미한 부상 하나를 치료할 수 있다]","sub":"소모품","lock":false},{"en":"EMPTY BOTTLE","ko":"빈 병","eff":"[액체를 담을 수 있다]","sub":"기타","lock":false},{"en":"BONE SAW","ko":"뼈톱","eff":"[인간과 언데드 적에게 추가 피해를 입힌다]","sub":"무기 · A슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"HUNTING RIFLE","ko":"사냥용 소총","eff":"[명중 시 피해량: 16]","sub":"총기 · A슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"LUMP OF FLESH","ko":"살점 덩어리","eff":"(사용 시): 체력 +5 / 새로운 상태가 추가된다","sub":"소모품","lock":false},{"en":"SHOVEL","ko":"삽","eff":"[적을 쓰러트린 후 낮은 확률로 자금을 획득한다]","sub":"무기 · A슬롯","lock":false},{"en":"CHAMPAGNE","ko":"샴페인","eff":"(사용 시): 모든 아군 이성 +1","sub":"소모품","lock":false},{"en":"HOLY CANDLE","ko":"성스러운 양초","eff":"[인벤토리 소지 시 운 +1] / (사용 시): 이성 +2","sub":"소모품","lock":false},{"en":"SALT","ko":"소금","eff":"(사용 시): 유령 타입 적에게 8의 피해를 입힌다","sub":"소모품","lock":false},{"en":"FIRE AXE","ko":"소방 도끼","eff":"탁월한 근접 무기","sub":"무기 · A슬롯","lock":false},{"en":"FLASHLIGHT","ko":"손전등","eff":"인지 +1","sub":"장비 · B슬롯","lock":false},{"en":"CROWBAR","ko":"쇠지렛대","eff":"가볍지만 튼튼하다","sub":"무기 · A슬롯","lock":false},{"en":"HANDCUFFS","ko":"수갑","eff":"(인벤토리 소지 시): 인간 적의 힘을 5 감소시킨다 / (사용 시): 체력이 12 이하인 인간 적을 쓰러트린다","sub":"소모품","lock":false},{"en":"CHECK BOOK","ko":"수표책","eff":"(사용 시): 자금 +3; 파멸 +4%","sub":"소모품 · 캐릭터 전용","lock":true,"cond":"주리"},{"en":"FOREST TAPES","ko":"숲의 테이프","eff":"망가진 것 같지만, 복구할 방도가 있을지도 모른다.","sub":"기타","lock":false},{"en":"STEAK KNIFE","ko":"스테이크 칼","eff":"칼날이 날카로워 아무리 질긴 고기라도 쉽게 자를 수 있다. 빨간 얼룩은 육즙이겠지...?","sub":"무기 · A슬롯","lock":false},{"en":"STALKER'S MASK","ko":"스토커의 가면","eff":"인간 적에게 주는 피해량 +1","sub":"장비 · B슬롯","lock":false},{"en":"SPORT RIFLE","ko":"스포츠 소총","eff":"[명중 시 피해량: 14]","sub":"총기 · A슬롯","lock":false},{"en":"EXPERIMENTAL DRUG","ko":"시약","eff":"(사용 시): 이성 +4 / 최대 체력 -2","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"CORPSE DUST","ko":"시체 가루","eff":"(사용 시): 경험치 +20 / 운 -2","sub":"소모품","lock":false},{"en":"BLESSED SHELL","ko":"신성한 탄약","eff":"(전투 시 사용): (탄약 +1 / 파멸 +5%); 사용 시 해당 전투 동안 사격 피해량 +10","sub":"소모품 · 캐릭터 전용","lock":true,"cond":"모리코"},{"en":"AYAKA'S CHALK","ko":"아야카의 분필","eff":"유령 적에게 주는 피해량 +2","sub":"장비 · C슬롯 · 캐릭터 전용","lock":true,"cond":"아야카"},{"en":"AIKO'S PLUSH TOY","ko":"아이코의 인형","eff":"받는 전투 피해량 -1 / 인지 -2; 운 -2","sub":"장비 · C슬롯 · 캐릭터 전용","lock":true,"cond":"아이코"},{"en":"DEMON MASK","ko":"악마 가면","eff":"피해량 +1 / 최대 체력 -4","sub":"장비 · B슬롯","lock":false},{"en":"ROCK RING","ko":"암석 반지","eff":"힘 +1 / 최대 이성 -2","sub":"장비 · C슬롯","lock":false},{"en":"DOG TREATS","ko":"애완견 간식","eff":"인벤토리 소지 시 상점의 아이템이 1만큼 저렴해진다","sub":"기타 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"JACOB'S GOLONKA","ko":"야곱의 골롱카","eff":"(사용 시): 체력 +1, 최대 체력 +1 / 파멸 +2%","sub":"소모품","lock":false},{"en":"BASEBALL BAT","ko":"야구 방망이","eff":"야구부가 쓰는 야구 방망이.","sub":"무기 · A슬롯","lock":false},{"en":"BASEBALL","ko":"야구공","eff":"(전투 시 사용): 적의 힘이 0으로 감소한다","sub":"소모품 · 캐릭터 전용","lock":true,"cond":"유미코"},{"en":"FOREIGN CIGARETTES","ko":"양담배","eff":"","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"ENERGY DRINK","ko":"에너지 드링크","eff":"(사용 시): 현재 미스터리가 끝날 때까지 민첩 +1","sub":"소모품","lock":false},{"en":"ELDRITCH AMULET","ko":"엘드리치 부적","eff":"착용 시 이성 +10","sub":"장비 · B슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"FUEL","ko":"연료","eff":"(사용 시): 가솔린으로 작동하는 기기에 연료를 주입한다","sub":"기타 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"CAN OF ACID","ko":"염산 캔","eff":"(사용 시): 엘드리치 적에게 7의 피해를 입힌다","sub":"소모품","lock":false},{"en":"ONYX MEDALLION","ko":"오닉스 메달","eff":"미스터리마다 저주+2 / (미스터리당 1회): / 저주 하나를 치유한다","sub":"장비 · C슬롯 · 캐릭터 전용","lock":true,"cond":"아야카"},{"en":"OLD COIN","ko":"오래된 동전","eff":"(사용 시): 대가 없이 / 저주 제거 기회를 1회 얻는다","sub":"소모품 · 캐릭터 전용","lock":true,"cond":"특이한 반점 배경"},{"en":"OCCULT DIARY","ko":"오컬트 일기장","eff":"(사용 시): 파멸 -3%","sub":"소모품","lock":false},{"en":"WINE BOTTLE","ko":"와인병","eff":"(사용 시): 이성 +3, 그게 다가 아니다","sub":"소모품","lock":false},{"en":"FUNNY MASK","ko":"웃기는 가면","eff":"(장착 시): 전투 시작 시 체력 혹은 이성 +1","sub":"장비 · B슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"MEDICAL KIT","ko":"의료 키트","eff":"(사용 시): 붕대를 2개 획득한다 / [인벤토리 소지 시 경미한 부상 하나를 치료할 수 있다]","sub":"소모품","lock":false},{"en":"RITUAL MASK","ko":"의식용 가면","eff":"[전투 시 낮은 확률로 이성 감소를 무시한다]","sub":"장비 · B슬롯","lock":false},{"en":"RITUAL MASK (PUMPKIN)","ko":"의식용 가면 (호박)","eff":"(사용 시): 조리해서 먹는다 / [전투 시 낮은 확률로 이성 감소를 무시한다]","sub":"장비 · B슬롯","lock":false},{"en":"RITUAL DAGGER","ko":"의식용 단도","eff":"[적을 쓰러트린 후 낮은 확률로 이성을 회복한다]","sub":"무기 · A슬롯","lock":false},{"en":"RITUAL ROBE","ko":"의식용 로브","eff":"마법 슬롯이 추가된다","sub":"장비 · C슬롯","lock":false},{"en":"GLASS EYE","ko":"의안","eff":"(사용 시): 인지 +1","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"HUMAN SKULL","ko":"인간의 해골","eff":"주문 시전 후에 임의의 효과가 발생한다","sub":"장비 · B슬롯","lock":false},{"en":"STRAIGHT RAZOR","ko":"일자 면도칼","eff":"모 할리우드 범죄 영화가 떠오른다. 지금 면도할 필요는 없다.","sub":"무기 · A슬롯","lock":false},{"en":"SMALL CANDLE","ko":"작은 양초","eff":"[전투에서 도주 시 받는 파멸 페널티가 감소한다]","sub":"무기 · A슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"TINY KEY","ko":"작은 열쇠","eff":"[특정 자물쇠를 열 수 있다]","sub":"기타","lock":false},{"en":"GOBLET","ko":"잔","eff":"[늘 차갑다]","sub":"기타","lock":false},{"en":"GOBLET (BLOOD)","ko":"잔 (피)","eff":"[늘 차갑다] / (사용 시): 피를 마신다","sub":"소모품","lock":false},{"en":"SWITCHBLADE","ko":"잭나이프","eff":"등대 열쇠","sub":"무기 · A슬롯","lock":false},{"en":"CURSED SCISSORS","ko":"저주받은 가위","eff":"[매 공격마다 낮은 확률로 파멸이 증가한다]","sub":"무기 · A슬롯","lock":false},{"en":"CURSED CARTRIDGE","ko":"저주받은 게임팩","eff":"아이템 투척 시 추가 피해를 입힌다","sub":"장비 · C슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"CURSED DOLL","ko":"저주받은 인형","eff":"(사용 시): 4-6의 피해를 입힌다 / 소요: 체력 1-2","sub":"소모품","lock":false},{"en":"CHAINSAW","ko":"전기톱","eff":"[무거운 공구]: 힘 -1","sub":"무기 · A슬롯","lock":false},{"en":"CHAINSAW (NO FUEL)","ko":"전기톱 (연료 없음)","eff":"[작동시키려면 연료가 필요하다]","sub":"기타","lock":false},{"en":"FAVORITE SNACKS","ko":"좋아하는 과자","eff":"(사용 시): 이성과 체력 각각 +3","sub":"소모품 · 캐릭터 전용","lock":true,"cond":"기본 캐릭터"},{"en":"POCKET KNIFE","ko":"주머니칼","eff":"(사용 시): 파멸 페널티 없이 자동으로 전투에서 도망친다","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"MAP","ko":"지도","eff":"마을이나 숲 지역 조사 시 낮은 확률로 파멸이 감소한다","sub":"장비 · C슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"PAIN MEDICATION","ko":"진통약","eff":"(사용 시): 체력 +4 / 최대 이성 -2","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"PAINKILLER","ko":"진통제","eff":"(사용 시): 체력 +2","sub":"소모품","lock":false},{"en":"PRESCRIPTION PILLS","ko":"처방약","eff":"(사용 시): 이성 +2","sub":"소모품","lock":false},{"en":"SOFT DRINK","ko":"청량 음료","eff":"(사용 시): 이성 +2","sub":"소모품","lock":false},{"en":"EXTRA AMMO","ko":"추가 탄약","eff":"(사용 시): 탄약 +3","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"FATAL FLORA","ko":"치명적인 식물군","eff":"(사용 시): 식물 적에게 8의 피해를 입힌다 / [새로운 상태가 추가된다]","sub":"소모품","lock":false},{"en":"CAMERA","ko":"카메라","eff":"지식 1","sub":"장비 · B슬롯","lock":false},{"en":"KATANA","ko":"카타나","eff":"백만 번 이상 제련하여 벼려낸 칼날.","sub":"무기 · A슬롯","lock":false},{"en":"BOX CUTTER (BROKEN)","ko":"커터칼 (망가짐)","eff":"커터칼 날이 부러졌다!","sub":"무기 · A슬롯","lock":false},{"en":"KIRIE'S BAG","ko":"키리에의 가방","eff":"(인벤토리 소지 시): 주문을 잊으면 이성이 1-2 감소하고 파멸이 1% 증가하나, 임의의 주문을 얻는다.","sub":"기타 · 캐릭터 전용","lock":true,"cond":"키리에"},{"en":"TAIYAKI","ko":"타이야키","eff":"(사용 시): 이성 +1","sub":"소모품","lock":false},{"en":"DUST OF SEEING","ko":"통찰의 가루","eff":"[보이지 않는 괴수의 일부를 일시적으로 드러낸다] / (사용 시): 적의 힘을 0으로 만든다","sub":"소모품","lock":false},{"en":"CURIOUS STATUETTE","ko":"특이한 소상","eff":"인벤토리 소지 시 지식 +1","sub":"기타","lock":false},{"en":"HEAVY DUTY FLASHLIGHT","ko":"튼튼한 손전등","eff":"[광원으로 간주한다]","sub":"무기 · A슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"ARM SLING","ko":"팔걸이","eff":"체력 +4","sub":"장비 · B슬롯 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"PANCAKES","ko":"팬케이크","eff":"(사용 시): 체력 +2 / 파멸 -2%","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"MARKED BIBLE","ko":"표식이 있는 성경","eff":"(인벤토리 소지 시): 캐릭터의 믿음 수치에 따라 휴식 시 회복되는 이성/체력이 증가한다","sub":"기타 · 캐릭터 전용","lock":true,"cond":"야시로"},{"en":"FLARE GUN","ko":"플레어 건","eff":"(사용 시): 대상 적에게 2의 피해를 입힌다 (엘드리치 혹은 식물 타입의 경우 8)","sub":"소모품 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"FILM ROLL","ko":"필름 롤","eff":"(사용 시): 자금 -1; 경험치 +10","sub":"소모품 · 캐릭터 전용","lock":true,"cond":"코지"},{"en":"HAPPI COAT","ko":"핫피 코트","eff":"운 +1","sub":"장비 · C슬롯","lock":false},{"en":"ANATOMY BOOK","ko":"해부학 서적","eff":"(사용 시): 체력 -2; 경험치 +8","sub":"소모품 · 캐릭터 전용","lock":true,"cond":"미미"},{"en":"LUCKY EARRINGS","ko":"행운의 귀걸이","eff":"(착용 시): 운 +2","sub":"장비 · C슬롯","lock":false},{"en":"VANITY MIRROR","ko":"화장대 거울","eff":"이벤트 선택지에 대한 추가 정보를 밝힌다","sub":"장비 · C슬롯 · 캐릭터 전용","lock":true,"cond":"미즈키"},{"en":"TORCH","ko":"횃불","eff":"[광원으로 간주한다]","sub":"무기 · A슬롯","lock":false}],"spell":[{"en":"AWAKEN","ko":"각성","eff":"무작위 능력치 2개 +1 (중복 가능), 파멸 +10. 기본 주문 목록에 없음","sub":"주문","lock":false},{"en":"VOID","ko":"공허","eff":"현재 이벤트를 무시하고 즉시 임의의 아더월드 지역을 조사한다 / [1회만 사용 가능] / [소요: 이성 3]","sub":"1회용 주문","lock":false},{"en":"SHADOW SHROUD","ko":"그림자 장막","eff":"이 미스터리가 완료될 때까지, 지역 위협 수치를 무시한다 / [소요: 이성 3]","sub":"주문","lock":false},{"en":"MEMORY EXTRACT","ko":"기억 추출","eff":"경험치 -10, 이성 +2","sub":"주문","lock":false},{"en":"BRAIN WORMS","ko":"뇌사상충","eff":"파멸 -2% / [1회만 사용 가능] / [소요: 체력 2] / [이 주문을 잊을 경우 이성 -2]","sub":"1회용 주문 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"CAUTERIZE","ko":"뜸질","eff":"1회용. 체력 +2","sub":"1회용 주문","lock":false},{"en":"ENTHRALLMENT","ko":"매혹","eff":"1회용. 무작위 동료 +1, 이성 -4","sub":"1회용 주문","lock":false},{"en":"WITNESS CURSE","ko":"목격자의 저주","eff":"전투 중 받는 모든 체력 피해를 파멸 증가로 전환한다 / [소요: 이성 2]","sub":"의식","lock":false},{"en":"ABOLISH","ko":"무효화","eff":"엘드리치 적으로부터 받는 피해량이 1 감소한다 / [소요: 체력 3]","sub":"주문","lock":false},{"en":"MIDASU TOUCH","ko":"미다스의 손길","eff":"자금 +1 / [소요: 체력 2]","sub":"주문","lock":false},{"en":"MULTIPLY WOUND","ko":"부상 가중","eff":"최대 체력 대비 남은 체력에 따라 피해","sub":"주문","lock":false},{"en":"SEAL OF BRAM'EL","ko":"브람엘의 인장","eff":"1회용. 지식 영구 +1","sub":"1회용 주문","lock":false},{"en":"SEAL OF SAVVESH","ko":"새비쉬의 인장","eff":"1회용. 힘 영구 +1","sub":"1회용 주문","lock":false},{"en":"ANCESTRAL STRENGTH","ko":"선조의 힘","eff":"피해량 +1 / [소요: 이성 4]","sub":"의식","lock":false},{"en":"BOOK OF GORE","ko":"선혈의 서","eff":"이성과 체력 +3 / 임의의 부상을 하나 획득한다","sub":"주문","lock":false},{"en":"UNEARTHLY SUTURE","ko":"섬뜩한 봉합","eff":"대가 없이 부상 제거 기회를 1회 얻는다 / [파멸 +4% 증가]","sub":"주문","lock":false},{"en":"BINDING AGONY","ko":"속박의 고뇌","eff":"적 피해 -1 (최소 0), 이성 -3. 기본 주문 목록에 없음","sub":"주문","lock":false},{"en":"PROTECTIVE CARVINGS","ko":"수호 문양","eff":"의식. 체력 -4, 받는 피해 모두 -1. 업적 해금","sub":"의식 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"HOLY GLYPHS","ko":"신성한 상형 문자","eff":"인벤토리의 아이템 하나마다 파멸 1% 감소 / [사용 시 폐기] / [소요: 이성 2]","sub":"1회용 주문 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"GHOSTLY SPEAR","ko":"영계의 창","eff":"6의 피해를 입힌다 / [소요: 최대 체력 -1]","sub":"주문 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"THREAD OF FATE","ko":"운명의 끈","eff":"해당하는 인간 적을 무찌른다 / [사용 시 폐기] / [소요: 이성 4]","sub":"1회용 주문","lock":false},{"en":"FLESH REGROWTH","ko":"육신 재생","eff":"최대 체력 -2, 체력 +3","sub":"주문","lock":false},{"en":"ITHOTU FLAME","ko":"이쏘투의 불","eff":"8의 피해를 입힌다 / 파멸 +2% / [소요: 이성 1] / [소요: 체력 1]","sub":"주문","lock":false},{"en":"ASHEN CONTRACT","ko":"잿빛 계약","eff":"엘드리치가 아닌 적을 즉시 죽인다 / [1회만 사용 가능] / [파멸 +7% 증가]","sub":"주문","lock":false},{"en":"MIND DRAIN","ko":"정신 누출","eff":"5의 피해를 입힌다 / 2의 이성을 회복한다 / [소요: 최대 이성 -1]","sub":"주문","lock":false},{"en":"THIRD EYE","ko":"제3의 눈","eff":"현재 미스터리가 끝날 때까지 지식과 인지 +1 / [효과 중첩 불가] / [소요: 이성 3]","sub":"주문","lock":false},{"en":"GROW TEETH","ko":"치아 발아","eff":"현재 미스터리가 끝날 때까지 새 전투 행동인 [물기]를 얻는다 / [소요: 체력 2]","sub":"주문","lock":false},{"en":"K'NPHA RITUAL","ko":"크은파 의식","eff":"아군이 사망할 경우 임의의 능력치가 1 증가한다 / [소요: 이성 2]","sub":"의식","lock":false},{"en":"EXPEL EVIL","ko":"퇴마","eff":"파멸 -6% / [1회만 사용 가능] / [소요: 체력 2]","sub":"1회용 주문","lock":false},{"en":"INVISIBILITY","ko":"투명인간","eff":"현재 미스터리가 끝날 때까지 전투에서 도주해도 파멸 페널티를 받지 않는다 / [소요: 이성 4]","sub":"주문","lock":false},{"en":"SKIN REMOVAL","ko":"피부 박리","eff":"6의 피해를 입힌다 / [소요: 이성 3]","sub":"주문","lock":false},{"en":"MEND","ko":"해결","eff":"체력 -2, 이성 +1. 기본 주문 목록에 없음","sub":"주문","lock":false},{"en":"REGENERATION","ko":"회복","eff":"체력을 4 회복한다 / [소요: 이성 2]","sub":"주문","lock":false},{"en":"ABSORB","ko":"흡수","eff":"3의 피해를 입히고 체력이 2 증가한다 / [소요: 이성 4]","sub":"주문","lock":false}],"curse":[{"en":"PANIC","ko":"공황","eff":"기본 명중률을 가진 모든 전투 행동의 성공률 -10%","sub":"저주","lock":false},{"en":"HOLES","ko":"구멍","eff":"미스터리 종료 시 체력 -2","sub":"저주","lock":false},{"en":"FUNGAL GROWTH","ko":"균류의 성장","eff":"최대 이성 -2 / (폐기 시): 체력이 3 감소한다","sub":"저주 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"JUST A DREAM?","ko":"그저 꿈이었는가?","eff":"미스터리 종료 시 파멸 -2","sub":"저주","lock":false},{"en":"BRANDED","ko":"낙인","eff":"조사마다 일정 확률로 파멸이 증가한다","sub":"저주","lock":false},{"en":"BRAIN DAMAGE","ko":"뇌 손상","eff":"지식 -2 / 최대 이성 +10%","sub":"저주","lock":false},{"en":"N. WITHDRAWAL","ko":"니코틴 금단증상","eff":"전투 행동 느려짐(1.2배), 담배를 쓰면 제거됨. 하루 시작 저주","sub":"저주","lock":false},{"en":"NICOTINE RUSH","ko":"니코틴 러시","eff":"전투 행동 빨라짐(0.9배), 조사마다 담배 카운터 -1","sub":"저주","lock":false},{"en":"FEARFUL","ko":"두려움","eff":"적과 조우할 때마다 이성이 1 감소한다","sub":"저주","lock":false},{"en":"MASOCHISTIC","ko":"마조히스트","eff":"적과 조우할 때마다 이성을 1 회복한다 / 최대 이성 -2","sub":"저주","lock":false},{"en":"INSOMNIA","ko":"불면증","eff":"미스터리 종료 시 이성이 2 감소한다","sub":"저주 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"SURVIVOR'S GUILT","ko":"생존자의 죄책감","eff":"미스터리 종료 시 파멸이 2% 추가된다","sub":"저주","lock":false},{"en":"STALKER","ko":"스토커","eff":"인간 적 피해 +1, 무제한 중첩","sub":"저주","lock":false},{"en":"RINGING EARS","ko":"이명","eff":"현재 미스터리가 끝날 때까지 모든 전투 행동의 속도가 감소한다","sub":"저주","lock":false},{"en":"INSMASU CURSE","ko":"인스마스의 저주","eff":"해변 조사 시 무작위로 체력 -1 / 이성 -1 / 파멸 +1","sub":"저주","lock":false},{"en":"SUICIDAL","ko":"자살 충동","eff":"전투에서 이성 잃을 때 체력도 잃음. 3중첩","sub":"저주","lock":false},{"en":"CURSED SIGNS","ko":"저주의 징조","eff":"주문 시전 시 파멸이 증가한다","sub":"저주","lock":false},{"en":"MIND WIPE","ko":"정신 파괴","eff":"경험치 -100 / (폐기 시): 이성이 3 감소한다","sub":"저주","lock":false},{"en":"FACELESS","ko":"정체불명","eff":"모든 능력치 -2","sub":"저주","lock":false},{"en":"TRAUMATIZED","ko":"트라우마","eff":"최대 이성 -10%","sub":"저주","lock":false},{"en":"PARANOIA","ko":"편집증","eff":"'Let's go' 대신 'Kill' 행동(동료 제거, 이성 +1). 전투에서 체력 잃을 때 이성도 잃음. 3중첩","sub":"저주","lock":false},{"en":"BLOOD FRENZY","ko":"피의 광란","eff":"피해량 +1 / 전투 중 추가 피해를 받는다 / (폐기 시): 체력이 3 감소한다","sub":"저주 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"HUNGER","ko":"허기","eff":"매력 -1 / [맛있어 보인다]","sub":"저주","lock":false},{"en":"HALLUCINATIONS","ko":"환영","eff":"인지 -1","sub":"저주 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"FLASHBACKS","ko":"회상","eff":"민첩 -2 / (폐기 시): 파멸 +4%","sub":"저주 · 업적 해금","lock":true,"cond":"업적 해금"}],"injury":[{"en":"COUGHING BLOOD","ko":"각혈","eff":"민첩 -2","sub":"경상","lock":false},{"en":"FRACTURED RIBS","ko":"갈비뼈 골절","eff":"민첩 -1","sub":"경상","lock":false},{"en":"INFECTED WOUND","ko":"감염된 상처","eff":"민첩 -1 / 인지 -1","sub":"중상","lock":false},{"en":"LEECHES","ko":"거머리","eff":"조사마다 일정 확률로 체력이 1 감소한다","sub":"경상","lock":false},{"en":"BROKEN BONE","ko":"골절","eff":"힘 -1 / 민첩 -1","sub":"중상","lock":false},{"en":"TORN MUSCLE","ko":"근육 파열","eff":"전투 중 모든 공격의 피해량 -1","sub":"중상","lock":false},{"en":"BROKEN JAW","ko":"깨진 턱","eff":"어떤 주문도 시전할 수 없다","sub":"경상","lock":false},{"en":"CONCUSSION","ko":"뇌진탕","eff":"현재 미스터리가 끝날 때까지 지식 -1","sub":"경상","lock":false},{"en":"CUT ARTERY","ko":"동맥 절단","eff":"조사마다 체력 -1","sub":"중상","lock":false},{"en":"FROSTBITE","ko":"동상","eff":"힘 -2","sub":"경상","lock":false},{"en":"EXPOSED RIBS","ko":"드러난 갈비뼈","eff":"최대 체력 -20%","sub":"중상","lock":false},{"en":"COLLAPSED LUNG","ko":"망가진 폐","eff":"전투 시퀀스 바가 20만큼 단축된다","sub":"중상","lock":false},{"en":"BITE","ko":"물린 자국","eff":"조사할 때마다 낮은 확률로 INFECTED WOUND로 악화","sub":"경상","lock":false},{"en":"ABDOMINAL CUT","ko":"복부 자상","eff":"최대 체력 -10%","sub":"중상","lock":false},{"en":"BROKEN NOSE","ko":"부러진 코","eff":"미스터리 중 집 휴식 효과 -1","sub":"경상","lock":false},{"en":"SWOLLEN JOINT","ko":"부어 오른 관절","eff":"전투 도주 불가, 제거 시 체력 -2·최대 체력 -1. 업적 해금","sub":"경상 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"HANGOVER","ko":"숙취","eff":"현재 미스터리가 끝날 때까지 모든 능력치 -1","sub":"경상","lock":false},{"en":"BADLY BLEEDING","ko":"심한 출혈","eff":"조사마다 일정 확률로 체력이 1 감소한다","sub":"경상","lock":false},{"en":"FACIAL TRAUMA","ko":"안면 충격","eff":"모든 전투 행동 성공률 -10%","sub":"중상","lock":false},{"en":"DISLOCATED SHOULDER","ko":"어깨 탈구","eff":"최대 체력 -1 / (폐기 시): 이성이 2 감소한다","sub":"경상 · 업적 해금","lock":true,"cond":"업적 해금"},{"en":"TINY CUTS","ko":"작은 자상","eff":"[효과 없음]","sub":"경상","lock":false},{"en":"MANGLED HAND","ko":"짓이겨진 손","eff":"전투 공격 시 체력 -1","sub":"중상","lock":false},{"en":"SLIT MOUTH","ko":"찢어진 입","eff":"힘·매력 -1","sub":"경상","lock":false},{"en":"CUT ARM SINEW","ko":"팔 힘줄 절단","eff":"전투 중 모든 공격의 피해량 -1","sub":"중상","lock":false},{"en":"BLOATED","ko":"팽창","eff":"미스터리 종료 시 이성 -1","sub":"경상","lock":false},{"en":"BURN","ko":"화상","eff":"받는 피해 +1","sub":"경상","lock":false}],"status":[{"en":"CAT'S CURIOSITY","ko":"고양이의 호기심","eff":"체력이나 이성이 0이 되어 되돌아올 때마다 파멸 페널티가 5%씩 붙고, 지금까지 죽은 횟수를 셉니다. '언제나 함께'와 함께 써야 의미가 있습니다. (커뮤니티 위키)","sub":"기본 캐릭터 전용 상태 · 카나 전용","lock":true,"cond":"카나"},{"en":"CQC TRAINING","ko":"근접전 훈련","eff":"총기를 근접 무기로 사용할 경우 피해량이 증가한다","sub":"퍽 · 근접 격투","lock":false},{"en":"REPORTER'S BAG","ko":"기자의 가방","eff":"인벤토리에 슬롯이 추가된다","sub":"퍽 · 아마추어 탐정","lock":false},{"en":"MORBID INSPIRATION","ko":"끔찍한 영감","eff":"이성 감소 시 경험치를 얻는다","sub":"퍽 · 쫓기는 예술가","lock":false},{"en":"MY WEIRD COLLECTION","ko":"나의 기이한 수집품","eff":"각 미스터리 종료 시 [오컬트] 태그를 가진 임의의 아이템을 획득한다","sub":"퍽 · 공포소설 작가","lock":false},{"en":"DEFT HANDLING","ko":"능숙한 손놀림","eff":"총기의 근접 공격 속도가 20% 상승한다","sub":"퍽 · 근접 격투","lock":false},{"en":"MAYHEM","ko":"대혼란","eff":"파멸이 오를수록 모든 능력치가 단계적으로 +1, +2, +3까지 오릅니다. (게임 문구)","sub":"기본 캐릭터 전용 상태 · 미쿠 전용","lock":true,"cond":"미쿠"},{"en":"ON THE RUN","ko":"도망자","eff":"'공포' 카운터가 생겨 파멸보다 두 배 빠르게 오르고, 파멸을 낮추는 효과로도 줄지 않습니다. 공포에 잡히기 전까지는 레벨업에 필요한 경험치가 50 줄어듭니다. (게임 문구 + 커뮤니티 위키)","sub":"기본 캐릭터 전용 상태 · 줄리 전용","lock":true,"cond":"줄리"},{"en":"SECOND SIGHT","ko":"두 번째 시선","eff":"유령과 엘드리치 적에게 추가 피해를 입힌다","sub":"퍽 · 마녀의 아이","lock":false},{"en":"FAME","ko":"명성","eff":"각 아군의 전투 행동 속도가 증가한다","sub":"퍽 · 능숙한 이야기꾼","lock":false},{"en":"FAST LEARNER","ko":"문일지십","eff":"전투 중 피해를 입을 경우 소량의 경험치 보너스를 획득한다","sub":"퍽 · 병원 직원","lock":false},{"en":"MIMI'S OBSESSION","ko":"미미의 집착","eff":"최대 이성이 20% 줄어듭니다. 미미는 이 상태로 시작합니다. (게임 문구)","sub":"기본 캐릭터 전용 상태 · 미미 전용","lock":true,"cond":"미미"},{"en":"STARS ARE RIGHT","ko":"별들이 제자리에","eff":"모든 운 스킬 체크에 자동으로 성공한다","sub":"퍽 · 타로 리더","lock":false},{"en":"OMINOUS LETTER","ko":"불길한 편지","eff":"레벨업에 경험치가 20 더 필요합니다. (게임 문구)","sub":"기본 캐릭터 전용 상태 · 야시로 전용","lock":true,"cond":"야시로"},{"en":"FAST HANDS","ko":"빠른 손","eff":"전투 조우 중 장비를 교체할 수 있다","sub":"퍽 · 초조한 운동선수","lock":false},{"en":"FAST SWIMMER","ko":"빠른 수영 선수","eff":"공격 행동이 빨라진다","sub":"퍽 · 스포츠 스타","lock":false},{"en":"SURVIVAL INSTINCT","ko":"생존 본능","eff":"이성이 3 미만일 경우 모든 이벤트 스킬 체크를 통과한다","sub":"퍽 · 자기 혹사","lock":false},{"en":"SIGNED CONTRACT","ko":"서명된 계약서","eff":"미스터리 완료 시 추가 자금을 획득한다","sub":"퍽 · 공포소설 작가","lock":false},{"en":"PICKPOCKET","ko":"소매치기","eff":"전투 후 아이템을 발견할 확률이 증가한다","sub":"퍽 · 좀도둑","lock":false},{"en":"SAFETY IN NUMBERS","ko":"수적 안전","eff":"최대 이성 +1. 미스터리가 끝날 때 동료가 2명 미만이면 이성이 2 줄어듭니다. (게임 문구)","sub":"기본 캐릭터 전용 상태 · 미즈키 전용","lock":true,"cond":"미즈키"},{"en":"PREDESTINED","ko":"숙명","eff":"최대 이성 +2 / 이성 +2","sub":"퍽 · 내면의 힘","lock":false},{"en":"AMMO STASH","ko":"숨겨둔 탄약","eff":"각 미스터리 종료 시 총알을 1-2 획득한다","sub":"퍽 · 군 복무 경력","lock":false},{"en":"SHARPENING STONE","ko":"숫돌","eff":"[날붙이] 타입 무기로 입히는 피해량이 1 증가한다","sub":"퍽 · 숙련된 도살자","lock":false},{"en":"ARCANE GRASP","ko":"신비의 이해","eff":"주문 슬롯이 2개 추가된다","sub":"퍽 · 마법 시전자","lock":false},{"en":"FRESH MEAT","ko":"신선한 고기","eff":"미스터리 완료 시 수상한 고기를 획득한다","sub":"퍽 · 숙련된 도살자","lock":false},{"en":"QUICK SHOPPER","ko":"신속한 쇼핑","eff":"아이템 구매 시 파멸이 2% 감소한다","sub":"퍽 · 쇼핑 중독자","lock":false},{"en":"DADDY'S GIRL","ko":"아빠바라기","eff":"각 미스터리 종료 시 체력을 2 회복한다","sub":"퍽 · 스포츠 스타","lock":false},{"en":"YAKUZA CARD","ko":"야쿠자 카드","eff":"모든 상점에서 슬롯 하나를 추가로 사용할 수 있다 / 모든 아이템에서 [불법] 태그가 제거된다","sub":"퍽 · 마피아 조직원","lock":false},{"en":"ALWAYS THERE","ko":"언제나 함께","eff":"최대 체력과 이성이 8로 고정됩니다. 체력이나 이성이 0이 되어도 패배하지 않고 8로 되돌아옵니다. '고양이의 호기심'과 짝을 이룹니다. (게임 문구 + 커뮤니티 위키)","sub":"기본 캐릭터 전용 상태 · 카나 전용","lock":true,"cond":"카나"},{"en":"HARD-KNOCK","ko":"역경","eff":"니코틴 러시 효과 발동 시 피해량 +1","sub":"퍽 · 고독한 늑대","lock":false},{"en":"PREMONITION","ko":"예지","eff":"이벤트 옵션 선택 시 능력치 기반 타입이 표시된다","sub":"퍽 · 타로 리더","lock":false},{"en":"OCCULT SIGNS","ko":"오컬트 기호","eff":"주문 시전 시 소량의 경험치를 획득한다","sub":"퍽 · 마녀의 아이","lock":false},{"en":"HOT BATH","ko":"온수 목욕","eff":"집에서 휴식 시 효과가 향상된다","sub":"퍽 · 나만의 시간","lock":false},{"en":"RUNNING SHOES","ko":"운동화","eff":"전투에서 도주 시 받는 파멸 페널티가 감소한다","sub":"퍽 · 도망의 대가","lock":false},{"en":"GHOST CONNECTION","ko":"유령 합체","eff":"미스터리 완료 시 임의의 주문을 얻는다","sub":"퍽 · 마법 시전자","lock":false},{"en":"STEALTH","ko":"은신","eff":"전투 조우에서 빠져나올 때마다 경험치를 10 획득한다","sub":"퍽 · 도망의 대가","lock":false},{"en":"FIRST AID","ko":"응급 처치","eff":"적을 쓰러트리면 이성을 2 회복한다","sub":"퍽 · 병원 직원","lock":false},{"en":"IREZUMI","ko":"이레즈미","eff":"상점의 아이템이 1 저렴해진다 / [최소치 1]","sub":"퍽 · 마피아 조직원","lock":false},{"en":"DOOMED ALREADY","ko":"이미 망했어","eff":"모든 이벤트 스킬 체크에 실패할 경우 이성을 1 회복한다","sub":"퍽 · 연쇄살인마","lock":false},{"en":"UNRELENTING","ko":"인정사정 볼 것 없다","eff":"최대 체력 +2 / 체력 +2","sub":"퍽 · 내면의 힘","lock":false},{"en":"IMPROVISE","ko":"임기응변","eff":"전투 조우 중 아이템 투척 효과가 증가한다","sub":"퍽 · 능숙한 이야기꾼","lock":false},{"en":"HAUNTING DREAMS","ko":"잊혀지지 않는 꿈","eff":"미스터리 완료 시 회복되는 이성이 증가한다","sub":"퍽 · 쫓기는 예술가","lock":false},{"en":"SELF-THERAPY","ko":"자가요법","eff":"주문을 잊을 경우 회복되는 이성이 증가한다","sub":"퍽 · 나만의 시간","lock":false},{"en":"DISCIPLINE","ko":"자제력","eff":"모든 이벤트 스킬 체크에 성공할 경우 체력을 1 회복한다","sub":"퍽 · 군 복무 경력","lock":false},{"en":"LOOTING","ko":"전리품","eff":"쓰러트린 적마다 자금을 1 획득한다","sub":"퍽 · 좀도둑","lock":false},{"en":"WINGING IT","ko":"즉흥적으로","eff":"모든 이벤트 스킬 체크에 마이너스(-)가 붙는다. 대신 이벤트 스킬 통과 시 추가 경험치가 부여된다","sub":"퍽 · 자기 혹사","lock":false},{"en":"DEDUCTION","ko":"추론","eff":"미스터리 완료 시 추가 경험치를 획득한다","sub":"퍽 · 아마추어 탐정","lock":false},{"en":"CORE STRENGTH","ko":"코어 근력","eff":"모든 전투 행동이 추가 피해를 입힌다","sub":"퍽 · 초조한 운동선수","lock":false},{"en":"BIG SPENDER","ko":"큰손","eff":"아이템 구매 시 일정 확률로 자금을 1 회복한다","sub":"퍽 · 쇼핑 중독자","lock":false},{"en":"ANATOMY CLASS","ko":"해부학 수업","eff":"인간 적에게 추가 피해를 입힌다","sub":"퍽 · 연쇄살인마","lock":false},{"en":"ON YOUR OWN","ko":"홀로서기","eff":"아군이 없을 경우 모든 능력치 +1","sub":"퍽 · 고독한 늑대","lock":false}]};
const BONUS_CATS = [["all","전체"],["item","아이템"],["spell","주문"],["curse","저주"],["injury","부상"],["status","상태·퍽"],["funds","자금"],["doom","파멸"],["bullets","총알"],["cigarettes","담배"]];
const NUM_DESC = {funds:"시작 자금이 그만큼 늘어납니다. 음수도 되지만 자금은 0 아래로 내려가지 않습니다.",doom:"시작 파멸이 그만큼 늘어납니다.",bullets:"총알 카운터가 그만큼 늘어납니다.",cigarettes:"담배 카운터가 그만큼 늘어납니다."};
const STATS = [["strength","STR","힘 (STR)"],["dexterity","DEX","민첩 (DEX)"],["perception","PER","인지 (PER)"],["charisma","CHR","매력 (CHR)"],["knowledge","KNW","지식 (KNW)"],["luck","LCK","운 (LUCK)"]];
// 공방 종류별 고정 폴더 접두사: 캐릭터 character_, 에너미 enemy_, 미스터리 mystery_
const FOLDER_PREFIX = "character_";
const KEY_SOUND_COUNT = 19;
const CLICK_SOUND_COUNT = 2;
const FILTERS = {
  orig:{label:"원본",ink:"#111111",paper:"#e9e9e4",panel:"#ffffff",mid:"#6b6b6b",img:"none"},
  dusk:{label:"어스름",ink:"#242732",paper:"#cfd3d8",panel:"#e6eaed",mid:"#6b6f7d",img:"url(#woh-dusk)"},
  neon:{label:"네온 슬래셔",ink:"#081012",paper:"#5a97a2",panel:"#3d7683",mid:"#173037",img:"url(#woh-neon)"}
};
const SWATCHES = [
  {name:"검정 0",v:"#000000"},{name:"회색 24",v:"#181818"},{name:"회색 42",v:"#2a2a2a"},{name:"회색 76",v:"#4c4c4c"},{name:"회색 109",v:"#6d6d6d"},
  {name:"회색 158",v:"#9e9e9e"},{name:"흰색 255",v:"#ffffff"},{name:"포인트 #FF40FE",v:"#ff40fe",tip:"게임 색상 필터에 따라 포인트 색으로 바뀌는 특수 색입니다."},{name:"투명 (#40FF40)",v:null,tip:"게임이 투명으로 처리하는 초록색입니다. 내보낼 때 #40FF40으로 저장됩니다."}
];
const TOOLS = [
  {id:"pencil",name:"연필",glyph:"✎",key:"B",desc:"한 칸씩 점을 찍습니다."},
  {id:"eraser",name:"지우개",glyph:"□",key:"E",desc:"투명(#40FF40)으로 지웁니다."},
  {id:"fill",name:"채우기",glyph:"◧",key:"G",desc:"같은 색으로 이어진 영역을 한 번에 칠합니다."},
  {id:"picker",name:"스포이트",glyph:"◉",key:"I",desc:"찍은 점의 색을 앞색으로 가져옵니다. 캔버스에서 우클릭해도 됩니다."},
  {id:"dither",name:"무늬 붓",glyph:"▒",key:"D",desc:"체크 무늬로 한 칸씩 건너 칠합니다. 망점 질감을 낼 때 씁니다."},
  {id:"mirror",name:"좌우 대칭",glyph:"⇔",key:"M",desc:"켜 두면 반대쪽에도 똑같이 그려집니다. 다른 도구와 함께 쓰는 스위치입니다."},
  {id:"line",name:"직선",glyph:"╱",key:"L",desc:"누른 곳에서 뗀 곳까지 곧은 선을 긋습니다."},
  {id:"rect",name:"사각형",glyph:"▭",key:"U",desc:"끌어서 사각형 테두리를 그립니다."}
];
const STEPS = [["info","① 기본 정보","캐릭터 이름, 제작자, 선택 화면에 나오는 꼬리표와 소개 글을 적습니다."],["sprite","② 스프라이트","아이콘, 치비, 뒷모습, 전신, 초상화 A·B를 그립니다."],["status","③ 상태 덧그림","체력·이성이 낮거나 가면·부상·저주가 생겼을 때 초상화 위에 겹쳐지는 그림을 그립니다."],["perk","④ 퍽·보너스","캐릭터 고유 퍽팩 2개와, 새 게임 시작 때 받는 보너스 2개를 고릅니다."],["export","⑤ 내보내기",".ito 내용을 확인하고 zip으로 내려받습니다."]];
const now = () => { const d = new Date(); return [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2,"0")).join(":"); };
const clamp = (v) => Math.max(0, Math.min(1, v));
const qv = (v) => "\"" + String(v == null ? "" : v).replace(/"/g, "'") + "\"";
const toHash = (t) => String(t).replace(/\r/g, "").split("\n").map(l => l === "" ? " " : l).join("#");
const hsv2hex = (h, s, v) => { const f = (n) => { const k = (n + h / 60) % 6; return v - v * s * Math.max(0, Math.min(k, 4 - k, 1)); };
  return "#" + [f(5), f(3), f(1)].map(x => Math.round(x * 255).toString(16).padStart(2, "0")).join(""); };
const hex2rgb = (hex) => [1,3,5].map(i => parseInt(hex.slice(i, i + 2), 16));
const hex2hsv = (hex) => { const [r,g,b] = hex2rgb(hex).map(x => x / 255); const mx = Math.max(r,g,b), mn = Math.min(r,g,b), d = mx - mn;
  let h = 0; if (d) { if (mx === r) h = ((g - b) / d) % 6; else if (mx === g) h = (b - r) / d + 2; else h = (r - g) / d + 4; h *= 60; if (h < 0) h += 360; }
  return { h, s: mx ? d / mx : 0, v: mx }; };

class Editor extends Component {
  state = {
    mode:"info", slot:4, zoom:null, panMode:false, filter:"orig", tool:"pencil",
    color:"#ff40fe", colorName:"포인트 #FF40FE", color2:"#ffffff", color2Name:"흰색 255", h:300, s:0.75, v:1,
    mirror:false, under:true, underPct:30, underWhich:"a", live:{}, warn:{}, active:{}, outfit:"a",
    folder:"character_", packA:null, packB:null, exportLang:"ko", extraIto:"", soundOn: (() => { try { return localStorage.getItem("woh-sound") !== "off"; } catch (e) { return true; } })(), importMenu:false, dragOver:false, exportAsk:false, itoPick:null, pathMap:{},
    bonusA:null, bonusB:null, bonusTarget:"a", bonusCat:"all", bonusQuery:"", numVals:{funds:5,doom:5,bullets:3,cigarettes:5}, perkView:"packs", tip:null, unlocked:{}, confirm:null,
    stats:{...DEFAULT_STATS},
    info:{...BLANK_INFO},
    logs:[
      {t:now(),msg:"비상업적 팬 제작 모딩 사이트입니다.",warn:false},
      {t:now(),msg:"새 캐릭터를 시작합니다. 예시가 필요하면 ① 기본 정보에서 '예시 불러오기'를 눌러주세요.",warn:false},
      {t:now(),msg:"단축키 안내: Ctrl+Z 되돌리기 · Ctrl+Y 다시하기 · X 앞뒤 색 교체 · 오른쪽 클릭은 스포이트입니다.",warn:false}
    ],
    history:[], future:[], over:{}, tipsOff:false, layers:{}, activeLayer:{}
  };
  root = null; drawing = false; useBg = false; pickMode = null; cvs = []; layerRefs = []; paintedSlot = -1;
  get cv() { return this.cvs[this.activeIdx()] || null; }
  setRoot = (el) => { this.root = el; };
  componentDidMount() { if (this.root) this.root.focus({preventScroll:true}); this.autoLoad(); document.addEventListener("keydown", this.onTypeSound, true); document.addEventListener("pointerdown", this.onClickSound, true); }
  componentWillUnmount() { document.removeEventListener("keydown", this.onTypeSound, true); document.removeEventListener("pointerdown", this.onClickSound, true); }
  // ---------- 타자 소리 ----------
  toggleSound = () => { const on = !this.state.soundOn; this.setState({ soundOn: on }); try { localStorage.setItem("woh-sound", on ? "on" : "off"); } catch (e) {} };
  loadSounds() {
    if (this.snd) return; const AC = window.AudioContext || window.webkitAudioContext; if (!AC) return;
    const ctx = new AC(); this.snd = { ctx, bufs: [], clicks: [], last: -1, lastC: -1 };
    const get = (url, list) => fetch(url).then(r => r.ok ? r.arrayBuffer() : Promise.reject())
      .then(b => new Promise((res, rej) => ctx.decodeAudioData(b, res, rej))).then(buf => { list.push(buf); }).catch(() => {});
    for (let i = 1; i <= CLICK_SOUND_COUNT; i++) get("click-" + i + ".mp3", this.snd.clicks);
    for (let i = 1; i <= KEY_SOUND_COUNT; i++) {
      fetch("keypress-" + String(i).padStart(2, "0") + ".wav").then(r => r.ok ? r.arrayBuffer() : Promise.reject())
        .then(b => new Promise((res, rej) => ctx.decodeAudioData(b, res, rej))).then(buf => { this.snd.bufs.push(buf); }).catch(() => {});
    }
  }
  playBuf(list, lastKey, vol) { const S = this.snd; if (!S || !list.length) return; if (S.ctx.state === "suspended") S.ctx.resume();
    let i = Math.floor(Math.random() * list.length); if (i === S[lastKey] && list.length > 1) i = (i + 1) % list.length; S[lastKey] = i;
    const src = S.ctx.createBufferSource(); src.buffer = list[i]; src.playbackRate.value = 0.96 + Math.random() * 0.08;
    const g = S.ctx.createGain(); g.gain.value = vol; src.connect(g).connect(S.ctx.destination); src.start(); }
  onClickSound = (e) => {
    if (!this.state.soundOn) return; this.loadSounds();
    if (e.button !== 0 || !e.target.closest || !e.target.closest("button, select, a[href], [role=menuitem], input[type=checkbox], input[type=radio], input[type=range]")) return;
    this.playBuf(this.snd ? this.snd.clicks : [], "lastC", 0.6 + Math.random() * 0.1);
  };
  onTypeSound = (e) => {
    if (!this.state.soundOn || e.repeat || ["Shift","Control","Alt","Meta","CapsLock","OS","Fn","HangulMode","HanjaMode"].includes(e.key)) return;
    this.loadSounds(); const S = this.snd; if (!S || !S.bufs.length) return;
    if (S.ctx.state === "suspended") S.ctx.resume();
    let i = Math.floor(Math.random() * S.bufs.length); if (i === S.last && S.bufs.length > 1) i = (i + 1) % S.bufs.length; S.last = i;
    const src = S.ctx.createBufferSource(); src.buffer = S.bufs[i]; src.playbackRate.value = 0.94 + Math.random() * 0.12;
    const g = S.ctx.createGain(); g.gain.value = (e.key === " " || e.key === "Enter" || e.key === "Backspace" ? 0.75 : 0.55) + Math.random() * 0.1;
    src.connect(g).connect(S.ctx.destination); src.start();
  };
  setLogBox = (el) => { this.logBox = el; if (el) el.scrollTop = el.scrollHeight; };
  componentDidUpdate() {
    if (this.paintedSlot !== this.state.slot) this.paintLayers();
    if (SAVE_FIELDS.some(k => this.state[k] !== this.lastSaved?.[k])) { this.lastSaved = {}; SAVE_FIELDS.forEach(k => { this.lastSaved[k] = this.state[k]; }); this.autoSave(); }
    if (this.logBox && this.logCount !== this.state.logs.length) { this.logCount = this.state.logs.length; this.logBox.scrollTop = this.logBox.scrollHeight; }
  }
  slotLayers(st = this.state, slot = st.slot) { const s = SLOTS[slot];
    return st.layers[s.key] || [{ name: "레이어 1", visible: true, data: st.live[s.key] || "" }]; }
  activeIdx(st = this.state) { const L = this.slotLayers(st); const a = st.activeLayer[SLOTS[st.slot].key]; return Math.max(0, Math.min(a == null ? L.length - 1 : a, L.length - 1)); }
  layerRef(i) { if (!this.layerRefs[i]) this.layerRefs[i] = (el) => { this.cvs[i] = el; if (el) this.paintLayer(i); }; return this.layerRefs[i]; }
  paintLayer(i) {
    const cv = this.cvs[i]; const L = this.slotLayers()[i]; const s = SLOTS[this.state.slot];
    if (!cv || !L) return Promise.resolve();
    cv.width = s.w; cv.height = s.h; const ctx = cv.getContext("2d"); ctx.imageSmoothingEnabled = false; ctx.clearRect(0,0,s.w,s.h);
    if (!L.data) return Promise.resolve();
    const key = s.key;
    return new Promise(res => { const im = new Image();
      im.onload = () => { if (SLOTS[this.state.slot].key === key) { ctx.clearRect(0,0,s.w,s.h); ctx.drawImage(im,0,0); } res(); };
      im.onerror = () => res(); im.src = L.data; });
  }
  paintLayers() { this.paintedSlot = this.state.slot; return Promise.all(this.slotLayers().map((_, i) => this.paintLayer(i))); }
  composite() { const s = SLOTS[this.state.slot]; const out = document.createElement("canvas"); out.width = s.w; out.height = s.h; const ctx = out.getContext("2d");
    this.slotLayers().forEach((L, i) => { if (L.visible && this.cvs[i]) ctx.drawImage(this.cvs[i], 0, 0); }); return out; }
  refreshComposite() { const s = SLOTS[this.state.slot]; const url = this.composite().toDataURL(); this.setState(st => ({ live: { ...st.live, [s.key]: url } })); }
  layerOp(kind, i) {
    const s = SLOTS[this.state.slot]; const key = s.key;
    const before = this.stackOf(this.state.slot);
    let L = before.layers.map(x => ({ ...x }));
    let a = this.activeIdx();
    if (kind === "add") { if (L.length >= 3) { this.log("레이어는 3개까지 만들 수 있습니다.", true); return; }
      const n = Math.max(0, ...L.map(x => Number(x.name.replace(/\D/g, "")) || 0)) + 1;
      L = [...L.slice(0, a + 1), { name: "레이어 " + n, visible: true, data: "" }, ...L.slice(a + 1)]; a = a + 1; }
    else if (kind === "del") { if (L.length <= 1) { this.log("마지막 레이어는 지울 수 없습니다.", true); return; }
      this.log(L[i].name + "을(를) 지웠습니다.", false); L = L.filter((_, j) => j !== i); a = Math.min(a > i ? a - 1 : a, L.length - 1); }
    else if (kind === "up") { if (i >= L.length - 1) return; [L[i], L[i + 1]] = [L[i + 1], L[i]]; a = i + 1; }
    else if (kind === "down") { if (i <= 0) return; [L[i], L[i - 1]] = [L[i - 1], L[i]]; a = i - 1; }
    else if (kind === "vis") { L[i] = { ...L[i], visible: !L[i].visible }; }
    else if (kind === "pick") { a = i; }
    const undoable = kind !== "pick";
    this.setState(st => ({ layers: { ...st.layers, [key]: L }, activeLayer: { ...st.activeLayer, [key]: a },
      ...(undoable ? { history: [...st.history, before].slice(-50), future: [] } : {}) }),
      () => this.paintLayers().then(() => this.refreshComposite()));
  }
  fitZoom(s) { const b = this.zoomBox; const w = b ? b.clientWidth - 16 : 420, h = b ? b.clientHeight - 16 : 440;
    return Math.max(1, Math.min(16, Math.floor(Math.min(w / s.w, h / s.h)))); }
  setZoomBox = (el) => { this.zoomBox = el; if (el && !el.__wheelBound) { el.__wheelBound = true;
    const flash = () => { el.classList.add("show-sb"); clearTimeout(el.__sbT); el.__sbT = setTimeout(() => el.classList.remove("show-sb"), 1500); };
    el.addEventListener("scroll", flash, { passive: true }); el.addEventListener("mouseenter", flash);
    el.addEventListener("wheel", (e) => { if (!(this.state.mode === "sprite" || this.state.mode === "status")) return; e.preventDefault(); this.zoomBy(e.deltaY < 0 ? 1 : -1, e); }, { passive: false }); } };
  zoomBy(dir, e) {
    const STEPS_Z = [1, 2, 3, 4, 5, 6, 8, 10, 12, 16, 20, 24, 32];
    const cur = this.curZoom || 1; let i = STEPS_Z.findIndex(z => z >= cur); if (i < 0) i = STEPS_Z.length - 1;
    if (STEPS_Z[i] !== cur && dir < 0) i = i; else i = i + dir;
    const next = STEPS_Z[Math.max(0, Math.min(STEPS_Z.length - 1, i))]; if (next === cur) return;
    const box = this.zoomBox, cv = this.cv || this.cvs.find(Boolean);
    let anchor = null;
    if (box && cv) { const r = cv.getBoundingClientRect(); const cx = e ? e.clientX : r.left + r.width / 2, cy = e ? e.clientY : r.top + r.height / 2;
      anchor = { cx, cy, fx: (cx - r.left) / r.width, fy: (cy - r.top) / r.height }; }
    this.setState({ zoom: next }, () => requestAnimationFrame(() => { if (!anchor || !box) return; const c2 = this.cv || this.cvs.find(Boolean); if (!c2) return;
      const r2 = c2.getBoundingClientRect(); box.scrollLeft += (r2.left + anchor.fx * r2.width) - anchor.cx; box.scrollTop += (r2.top + anchor.fy * r2.height) - anchor.cy; }));
  }
  onKeyUp = (e) => { if (e.key === " ") { this.spaceDown = false; if (this.state.panMode) this.setState({ panMode: false }); } };
  log(msg, warn) { this.setState(st => { const all = [...st.logs, {t:now(), msg, warn:!!warn}]; return { logs: all.length > 30 ? [all[0], ...all.slice(-29)] : all }; }); }
  pos(e) { const cv = this.cv || this.cvs.find(Boolean); const r = cv.getBoundingClientRect(); const s = SLOTS[this.state.slot];
    return [Math.floor((e.clientX - r.left) / r.width * s.w), Math.floor((e.clientY - r.top) / r.height * s.h)]; }
  paintColor() { return this.useBg ? this.state.color2 : this.state.color; }
  plot(x, y) {
    const s = SLOTS[this.state.slot]; const ctx = this.cv.getContext("2d"); const {tool, mirror} = this.state; const color = this.paintColor();
    const pts = mirror ? [[x,y],[s.w-1-x,y]] : [[x,y]];
    for (const [px,py] of pts) {
      if (px < 0 || py < 0 || px >= s.w || py >= s.h) continue;
      if (tool === "dither" && (px + py) % 2) continue;
      if (tool === "eraser" || this.penErase || color === null) ctx.clearRect(px,py,1,1); else { ctx.fillStyle = color; ctx.fillRect(px,py,1,1); }
    }
  }
  flood(x, y) {
    const s = SLOTS[this.state.slot]; const ctx = this.cv.getContext("2d"); const img = ctx.getImageData(0,0,s.w,s.h); const d = img.data;
    const at = (i) => d[i*4]+","+d[i*4+1]+","+d[i*4+2]+","+d[i*4+3]; const start = y*s.w+x; const target = at(start);
    const c = this.paintColor(); const rgba = c === null ? [0,0,0,0] : [...hex2rgb(c), 255];
    if (target === rgba.join(",")) return; const stack = [start]; let n = 0;
    while (stack.length && n < 60000) { const i = stack.pop(); if (at(i) !== target) continue; n++;
      d[i*4]=rgba[0]; d[i*4+1]=rgba[1]; d[i*4+2]=rgba[2]; d[i*4+3]=rgba[3];
      const px = i % s.w, py = (i - px) / s.w;
      if (px > 0) stack.push(i-1); if (px < s.w-1) stack.push(i+1); if (py > 0) stack.push(i-s.w); if (py < s.h-1) stack.push(i+s.w); }
    ctx.putImageData(img,0,0);
  }
  setFg(hex, name) { const extra = hex ? hex2hsv(hex) : {}; this.setState(st => ({ color: hex, colorName: name || (hex ? hex.toUpperCase() : "투명 (#40FF40)"), ...extra,
    tool: st.tool === "eraser" || st.tool === "picker" ? "pencil" : st.tool })); }
  pDown = (e) => {
    if (!this.cvs.find(Boolean)) return; if (this.root) this.root.focus({preventScroll:true});
    if ((this.spaceDown || e.button === 1) && this.zoomBox) { e.preventDefault(); this.panning = { x: e.clientX, y: e.clientY, sl: this.zoomBox.scrollLeft, st: this.zoomBox.scrollTop };
      e.currentTarget.setPointerCapture(e.pointerId); return; }
    const [x,y] = this.pos(e); this.useBg = false; this.penErase = e.pointerType === "pen" && (e.button === 5 || (e.buttons & 32) === 32);
    if (e.button === 2 || this.state.tool === "picker") { const p = this.composite().getContext("2d").getImageData(x,y,1,1).data;
      const hex = p[3] ? "#" + [p[0],p[1],p[2]].map(v => v.toString(16).padStart(2,"0")).join("") : null; this.setFg(hex); return; }
    const curL = this.slotLayers()[this.activeIdx()];
    if (!this.cv || !curL || !curL.visible) { this.log("숨긴 레이어에는 그릴 수 없습니다. 눈 버튼으로 다시 켜주세요.", true); return; }
    this.snapshot();
    if (this.state.tool === "fill" && !this.penErase) { this.flood(x,y); this.commit(); return; }
    if (this.state.tool === "line" || this.state.tool === "rect") { const s2 = SLOTS[this.state.slot];
      this.shape = { kind: this.state.tool, x, y, base: this.cv.getContext("2d").getImageData(0, 0, s2.w, s2.h) }; this.drawing = true;
      e.currentTarget.setPointerCapture(e.pointerId); this.shapeDraw(x, y); return; }
    this.drawing = true; e.currentTarget.setPointerCapture(e.pointerId); this.plot(x,y); this.last = [x,y];
  };
  pMove = (e) => { if (this.panning) { const b = this.zoomBox; b.scrollLeft = this.panning.sl - (e.clientX - this.panning.x); b.scrollTop = this.panning.st - (e.clientY - this.panning.y); return; }
    if (!this.drawing) return; const [x,y] = this.pos(e); if (this.shape) { this.shapeDraw(x, y); return; } const [x0,y0] = this.last || [x,y];
    let dx = Math.abs(x - x0), dy = -Math.abs(y - y0), sx = x0 < x ? 1 : -1, sy = y0 < y ? 1 : -1, err = dx + dy, cx = x0, cy = y0;
    for (let n = 0; n < 2000; n++) { this.plot(cx, cy); if (cx === x && cy === y) break; const e2 = 2 * err; if (e2 >= dy) { err += dy; cx += sx; } if (e2 <= dx) { err += dx; cy += sy; } }
    this.last = [x,y]; };
  pUp = () => { if (this.panning) { this.panning = null; return; } if (!this.drawing) return; this.drawing = false; this.shape = null; this.commit(); };
  noMenu = (e) => e.preventDefault();
  commit() {
    const s = SLOTS[this.state.slot]; const idx = this.activeIdx();
    const layers = this.slotLayers().map((L, i) => i === idx && this.cvs[i] ? { ...L, data: this.cvs[i].toDataURL() } : L);
    const comp = this.composite(); const url = comp.toDataURL();
    const d = comp.getContext("2d").getImageData(0,0,s.w,s.h).data; let edge = 0;
    if (s.key !== "sprite_icon") for (let y = 0; y < s.h; y++) for (let x = 0; x < s.w; x++) {
      if (!(x === 0 || x === s.w-1 || y === 0)) continue; const i = (y*s.w+x)*4; if (d[i+3]) edge++; }
    const wasWarn = this.state.warn[s.key];
    this.setState(st => ({ layers: { ...st.layers, [s.key]: layers }, live: {...st.live, [s.key]: url}, warn: {...st.warn, [s.key]: edge > 0} }));
    if (edge > 0 && !wasWarn) this.log(s.key + ": 왼쪽·위·오른쪽 가장자리에 픽셀이 " + edge + "개 있습니다. 게임에서 흰색이 투명하게 처리될 수 있습니다.", true);
    else if (edge === 0 && wasWarn) this.log(s.key + ": 가장자리 경고가 해소되었습니다.", false);
  }
  stackOf(slot) { const st = this.state; const s = SLOTS[slot];
    const L = this.slotLayers(st, slot).map((x, j) => slot === st.slot && this.cvs[j] ? { ...x, data: this.cvs[j].toDataURL() } : { ...x });
    const a = st.activeLayer[s.key]; return { slot, layers: L, active: a == null ? L.length - 1 : a }; }
  pushHistory(snap) { this.setState(st => ({ history: [...st.history, snap].slice(-50), future: [] })); }
  snapshot() { this.pushHistory(this.stackOf(this.state.slot)); }
  step(from, to, verb) {
    const h = this.state[from]; if (!h.length) { this.log(verb === "undo" ? "더 되돌릴 작업이 없습니다." : "다시 실행할 작업이 없습니다.", false); return; }
    const last = h[h.length-1]; const s = SLOTS[last.slot]; const cur = this.stackOf(last.slot);
    this.setState(st => ({ [from]: st[from].slice(0,-1), [to]: [...st[to], cur].slice(-50), slot: last.slot, mode: s.group,
        layers: { ...st.layers, [s.key]: last.layers }, activeLayer: { ...st.activeLayer, [s.key]: last.active } }),
      () => this.paintLayers().then(() => this.refreshComposite()));
    this.log(s.key + (verb === "undo" ? ": 되돌렸습니다. (Ctrl+Z)" : ": 다시 실행했습니다. (Ctrl+Y)"), false);
  }
  undo = () => this.step("history", "future", "undo");
  redo = () => this.step("future", "history", "redo");
  swap = () => this.setState(st => ({ color: st.color2, colorName: st.color2Name, color2: st.color, color2Name: st.colorName, ...(st.color2 ? hex2hsv(st.color2) : {}) }));
  onKey = (e) => {
    const tag = (e.target.tagName || "").toLowerCase(); if (tag === "input" || tag === "textarea" || tag === "select") return;
    const k = (e.key || "").toLowerCase();
    if (e.ctrlKey || e.metaKey) {
      if (k === "z" && !e.shiftKey) { e.preventDefault(); this.undo(); }
      else if (k === "y" || (k === "z" && e.shiftKey)) { e.preventDefault(); this.redo(); }
      return;
    }
    if (k === " ") { e.preventDefault(); if (!this.spaceDown) { this.spaceDown = true; this.setState({ panMode: true }); } return; }
    if ((k === "+" || k === "=") && (this.state.mode === "sprite" || this.state.mode === "status")) { this.zoomBy(1); return; }
    if ((k === "-" || k === "_") && (this.state.mode === "sprite" || this.state.mode === "status")) { this.zoomBy(-1); return; }
    if (k === "0") { this.setState({ zoom: null }); return; }
    if (k === "x") { this.swap(); return; }
    const t = TOOLS.find(x => x.key.toLowerCase() === k);
    if (t) { if (t.id === "mirror") this.setState(x => ({ mirror: !x.mirror })); else this.setState({ tool: t.id }); }
  };
  ringDown = (e) => { e.currentTarget.setPointerCapture(e.pointerId); this.pickMode = "ring"; this.pickAt(e); };
  sqDown = (e) => { e.stopPropagation(); e.currentTarget.setPointerCapture(e.pointerId); this.pickMode = "sq"; this.pickAt(e); };
  pickMove = (e) => { if (this.pickMode) { e.stopPropagation(); this.pickAt(e); } };
  pickUp = (e) => { e.stopPropagation(); this.pickMode = null; };
  pickAt(e) {
    const r = e.currentTarget.getBoundingClientRect(); let {h, s, v} = this.state;
    if (this.pickMode === "ring") { const cx = r.left + r.width / 2, cy = r.top + r.height / 2;
      h = (Math.atan2(e.clientX - cx, -(e.clientY - cy)) * 180 / Math.PI + 360) % 360; }
    else { s = clamp((e.clientX - r.left) / r.width); v = 1 - clamp((e.clientY - r.top) / r.height); }
    const hex = hsv2hex(h, s, v);
    this.setState(st => ({ h, s, v, color: hex, colorName: hex.toUpperCase(), tool: st.tool === "eraser" || st.tool === "picker" ? "pencil" : st.tool }));
  }
  statRow(i) { const [k,ab,ko] = STATS[i]; return { abbr: ab, ko, tip: k === "luck" ? "게임 화면에는 표시되지 않는 능력치입니다." : "이벤트 판정 결과와 일부 전투 행동 속도에 영향을 줍니다.", val: this.state.stats[k],
    dec: () => this.setState(x => ({ stats: {...x.stats, [k]: Math.max(1, x.stats[k]-1)} })),
    inc: () => this.setState(x => ({ stats: {...x.stats, [k]: Math.min(10, x.stats[k]+1)} })) }; }
  measurePack(id, el) {
    if (!el) return;
    requestAnimationFrame(() => { const inner = el.firstElementChild; if (!inner) return;
      const ov = Math.max(0, Math.ceil(inner.scrollHeight - el.clientHeight));
      if ((this.state.over[id] || 0) !== ov) this.setState(st => ({ over: {...st.over, [id]: ov} })); });
  }

  // ---------- .ito 내용 만들기 ----------
  itoLines(st = this.state) {
    const has = (k) => !!st.live[k]; const pathOf = (k) => has(k) ? st.folder + "\\" + k + ".png" : "";
    const bon = (b) => this.bonInfo(b, st.exportLang); const q = qv;
    const L = ["[character]", "name="+q(st.info.name), "author="+q(st.info.author), "contact="+q(st.info.contact)]
      .concat(STATS.map(([k]) => k + "=" + q(st.stats[k])))
      .concat(SLOTS.filter(x => x.group === "sprite").flatMap(x => {
        const l = [x.key + "=" + q(pathOf(x.key))];
        if (x.key === "portrait_a") l.push("name_a=" + q(st.info.na)); if (x.key === "portrait_b") l.push("name_b=" + q(st.info.nb)); return l; }))
      .concat(["menu_tag="+q(toHash(st.info.tag)), "menu_desc="+q(toHash(st.info.desc)), "perkpack_a="+q(st.packA ? "["+st.packA+"]" : ""), "perkpack_b="+q(st.packB ? "["+st.packB+"]" : ""), "[status]"])
      .concat(SLOTS.filter(x => x.group === "status").map(x => x.key + "=" + q(pathOf(x.key))));
    const A = bon(st.bonusA), B = bon(st.bonusB);
    if (A.t || B.t) L.push("[starting_bonus]", "type_a="+q(A.t), "name_a="+q(A.n), "type_b="+q(B.t), "name_b="+q(B.n));
    if (st.extraIto) L.push(...st.extraIto.split("\n"));
    return L;
  }
  // ---------- 새 캐릭터 / 예시 ----------
  resetTo(patch, msg) {
    this.cvs.forEach(cv => { if (cv) cv.getContext("2d").clearRect(0, 0, cv.width, cv.height); });
    this.setState(st => ({ live: {}, layers: {}, activeLayer: {}, warn: {}, active: {}, history: [], future: [], unlocked: {}, extraIto: "", pathMap: {},
      info: { ...BLANK_INFO }, stats: { ...DEFAULT_STATS }, packA: null, packB: null, bonusA: null, bonusB: null, folder: FOLDER_PREFIX, ...patch }),
      () => { this.paintedSlot = -1; this.paintLayers(); });
    if (msg) this.log(msg, false);
  }
  newCharacter = () => {
    if (Object.keys(this.state.live).length && typeof confirm === "function" && !confirm("지금 작업을 지우고 새 캐릭터를 시작할까요?\n(필요하면 먼저 ⑤ 내보내기에서 작업 파일을 저장해주세요.)")) return;
    this.resetTo({}, "새 캐릭터를 시작합니다.");
  };
  loadSample = () => {
    if (Object.keys(this.state.live).length && typeof confirm === "function" && !confirm("지금 작업을 지우고 예시(미미르)를 불러올까요?")) return;
    this.resetTo({ live: { ...SAMPLE_IMG }, info: { ...SAMPLE_INFO }, folder: FOLDER_PREFIX + "mimir",
      stats: { strength:7, dexterity:6, perception:7, charisma:5, knowledge:3, luck:5 }, packA: "PUSHING YOURSELF", packB: "INNER STRENGTH",
      bonusA: { t: "item", en: "BANDAGE" }, bonusB: { t: "item", en: "STEAK KNIFE" } }, "예시 캐릭터(미미르)를 불러왔습니다.");
  };
  // ---------- 그림 처리 ----------
  loadImg(src) { return new Promise((res, rej) => { const im = new Image(); im.onload = () => res(im); im.onerror = rej; im.src = src; }); }
  async keyGreen(src, w, h, keepIcon) {
    const im = await this.loadImg(src); const c = document.createElement("canvas"); c.width = w; c.height = h;
    const x = c.getContext("2d"); x.drawImage(im, 0, 0); if (keepIcon) return { url: c.toDataURL(), iw: im.width, ih: im.height };
    const d = x.getImageData(0, 0, w, h); const a = d.data;
    for (let i = 0; i < a.length; i += 4) if (a[i] === 64 && a[i+1] === 255 && a[i+2] === 64) a[i+3] = 0;
    x.putImageData(d, 0, 0); return { url: c.toDataURL(), iw: im.width, ih: im.height };
  }
  async greenBlob(src, w, h, isIcon) {
    const im = await this.loadImg(src); const c = document.createElement("canvas"); c.width = w; c.height = h;
    const x = c.getContext("2d"); x.drawImage(im, 0, 0); const d = x.getImageData(0, 0, w, h); const a = d.data; let clear = 0;
    for (let i = 0; i < a.length; i += 4) {
      if (a[i+3] < 128) { clear++; if (!isIcon) { a[i] = 64; a[i+1] = 255; a[i+2] = 64; a[i+3] = 255; } }
      else a[i+3] = 255;
    }
    x.putImageData(d, 0, 0);
    return { blob: await new Promise(r => c.toBlob(r, "image/png")), clear };
  }
  // ---------- .ito 불러오기 ----------
  setImportInput = (el) => { this.importInput = el; };
  openImport = () => { if (this.importInput) { this.importInput.value = ""; this.importInput.click(); } };
  setZipInput = (el) => { this.zipInput = el; }; setItoInput = (el) => { this.itoInput = el; }; setImgInput = (el) => { this.imgInput = el; };
  pick(el) { this.setState({ importMenu: false }); if (el) { el.value = ""; el.click(); } }
  onImportFiles = (e) => this.importAuto(this.tagFiles(Array.from(e.target.files || [])), "folder");
  onPickAuto = (e) => this.importAuto(Array.from(e.target.files || []), "auto");
  onPickIto = async (e) => { const f = (e.target.files || [])[0]; if (f) await this.importIto(f, [], false); };
  onPickImg = (e) => this.importImages(Array.from(e.target.files || []));
  tagFiles(files) { files.forEach(f => { const rp = f.webkitRelativePath || ""; f.dir = rp.split("/").slice(0, -1).join("/"); }); return files; }
  readFileUrl(f) { return new Promise(r => { const fr = new FileReader(); fr.onload = () => r(fr.result); fr.readAsDataURL(f); }); }
  async readSlotImage(f, x) {
    const k = await this.keyGreen(await this.readFileUrl(f), x.w, x.h, x.key === "sprite_icon");
    if (k.iw !== x.w || k.ih !== x.h) this.log(x.key + ": 그림 크기가 " + k.iw + "×" + k.ih + "입니다. 이 칸은 " + x.w + "×" + x.h + "라 넘치는 부분은 잘리거나 비게 됩니다.", true);
    return k.url;
  }
  // zip은 풀어서 파일 목록으로
  async expandZips(files) {
    const out = [];
    for (const f of files) {
      if (!/\.zip$/i.test(f.name)) { out.push(f); continue; }
      if (typeof JSZip === "undefined") { this.log("zip 불러오기는 실제 사이트에서 동작합니다. (시안 화면에서는 꺼져 있습니다)", true); continue; }
      try { const z = await JSZip.loadAsync(f); const ents = Object.values(z.files).filter(e => !e.dir && !/(^|\/)__MACOSX\//.test(e.name));
        for (const e of ents) { const parts = e.name.split("/"); const nf = new File([await e.async("blob")], parts.pop()); nf.dir = parts.join("/"); out.push(nf); }
        this.log(f.name + "을(를) 풀었습니다. 파일 " + ents.length + "개.", false);
      } catch (err) { this.log(f.name + "을(를) 풀지 못했습니다. 손상된 zip인지 확인해주세요.", true); }
    }
    return out;
  }
  async importAuto(files, how) {
    if (!files.length) return; files = await this.expandZips(files);
    const itos = files.filter(f => /\.ito$/i.test(f.name)).sort((a, b) => a.name.localeCompare(b.name));
    const pngs = files.filter(f => /\.png$/i.test(f.name));
    if (!itos.length) {
      if (pngs.length) { await this.importImages(pngs); return; }
      this.log("불러올 .ito나 그림(png)을 찾지 못했습니다.", true); return; }
    if (itos.length > 1) { this.setState({ itoPick: { itos, files } }); return; }
    await this.importIto(itos[0], files, true);
  }
  pickIto = async (i) => { const p = this.state.itoPick; this.setState({ itoPick: null }); if (p) await this.importIto(p.itos[i], p.files, true); };
  // 그림만: 칸 이름(portrait_a.png 등) → 마지막으로 불러온 .ito의 경로 이름 → 한 장이면 지금 칸
  async importImages(pngs) {
    const st = this.state; let got = 0; const live = { ...st.live }; const layers = { ...st.layers }; const left = [];
    for (const f of pngs) {
      const base = f.name.toLowerCase(); const key = SLOTS.find(x => x.key + ".png" === base)?.key || (st.pathMap || {})[base];
      if (!key) { left.push(f); continue; }
      const x = SLOTS.find(y => y.key === key); live[key] = await this.readSlotImage(f, x); delete layers[key]; got++;
    }
    if (left.length === 1 && got === 0 && (st.mode === "sprite" || st.mode === "status")) {
      const x = SLOTS[st.slot]; live[x.key] = await this.readSlotImage(left[0], x); delete layers[x.key]; got++;
      this.log(left[0].name + "을(를) 지금 칸(" + x.key + ")에 넣었습니다.", false); left.length = 0; }
    if (left.length) this.log("칸을 알 수 없는 그림 " + left.length + "장: " + left.slice(0, 4).map(f => f.name).join(", ") + (left.length > 4 ? " 외" : "") + ". 파일 이름을 칸 이름(예: portrait_a.png)으로 바꾸거나, 칸을 고른 뒤 한 장씩 넣어주세요.", true);
    if (!got) return;
    this.setState({ live, layers, history: [], future: [] }, () => { this.paintedSlot = -1; this.paintLayers(); });
    this.log("그림 " + got + "장을 불러왔습니다. (작업 내역은 새로 시작합니다)", false);
  }
  onDragOver = (e) => { if (!e.dataTransfer || !Array.from(e.dataTransfer.types || []).includes("Files")) return; e.preventDefault(); e.dataTransfer.dropEffect = "copy"; if (!this.state.dragOver) this.setState({ dragOver: true }); };
  onDragLeave = (e) => { if (e.relatedTarget && this.root && this.root.contains(e.relatedTarget)) return; this.setState({ dragOver: false }); };
  onDrop = async (e) => {
    e.preventDefault(); this.setState({ dragOver: false }); const dt = e.dataTransfer; if (!dt) return;
    const entries = Array.from(dt.items || []).map(it => it.webkitGetAsEntry && it.webkitGetAsEntry()).filter(Boolean);
    let files = [];
    if (entries.length) {
      const walk = async (ent, dir) => {
        if (ent.isFile) { const f = await new Promise((r, j) => ent.file(r, j)); f.dir = dir; files.push(f); return; }
        const rd = ent.createReader(); let batch;
        do { batch = await new Promise((r, j) => rd.readEntries(r, j)); for (const c of batch) await walk(c, dir ? dir + "/" + ent.name : ent.name); } while (batch.length);
      };
      for (const ent of entries) await walk(ent, "");
    } else files = Array.from(dt.files || []);
    await this.importAuto(files, "drop");
  };
  async importIto(ito, files, withImages) {
    const text = new TextDecoder("utf-8").decode(await ito.arrayBuffer()).replace(/^\uFEFF/, "");
    const pngs = files.filter(f => /\.png$/i.test(f.name)); const inDir = (f, d) => ("/" + (f.dir || "").toLowerCase()).endsWith("/" + d);
    // 경로에 적힌 폴더 안의 그림을 먼저 찾고, 그 폴더가 아예 없을 때만 이름만 같은 그림을 씀
    const findImg = (path) => { const parts = path.toLowerCase().split(/[\\/]/); const base = parts.pop(); const d = parts.join("/");
      const same = pngs.filter(f => f.name.toLowerCase() === base);
      if (!d) return same[0]; const hit = same.find(f => inDir(f, d)); if (hit) return hit;
      return pngs.some(f => inDir(f, d)) ? null : same[0]; };
    const sec = {}; let cur = null; const extra = []; let quoteFix = 0;
    for (const raw of text.split(/\r?\n/)) {
      const line = raw.trim(); if (!line) continue;
      const m = line.match(/^\[([^\]]+)\]$/);
      if (m) { cur = m[1].toLowerCase(); sec[cur] = sec[cur] || {}; if (!["character","status","starting_bonus"].includes(cur)) extra.push(line); continue; }
      const kv = line.match(/^([^=]+)=(.*)$/); if (!kv || !cur) continue;
      let v = kv[2].trim(); if (v.startsWith("\"")) { v = v.slice(1); if (v.endsWith("\"")) v = v.slice(0, -1); else quoteFix++; }
      if (["character","status","starting_bonus"].includes(cur)) sec[cur][kv[1].trim()] = v; else extra.push(kv[1].trim() + "=\"" + v + "\"");
    }
    const C = sec.character || {}, S2 = sec.status || {}, B2 = sec.starting_bonus || {};
    const unhash = (t) => (t || "").split("#").map(l => l === " " ? "" : l).join("\n");
    const stats = {}; STATS.forEach(([k]) => { const n = parseInt(C[k], 10); stats[k] = isNaN(n) ? DEFAULT_STATS[k] : Math.max(1, Math.min(10, n)); });
    const pk = (v) => { const id = (v || "").replace(/^\[|\]$/g, "").trim(); if (!id) return null;
      if (!PACKS.find(p => p[0] === id)) { this.log("알 수 없는 퍽팩: " + v + " (목록에 없는 팩이라 비워 둡니다)", true); return null; } return id; };
    const findB = (t, n) => { if (!t) return null; if (!BONUS_DB[t]) return { t, v: Number(n) || 0 };
      const x = BONUS_DB[t].find(y => y.ko === n || y.en.toLowerCase() === String(n).toLowerCase());
      if (!x) this.log("시작 보너스 '" + n + "'을(를) 목록에서 찾지 못했습니다. 이름은 그대로 둡니다.", true);
      return { t, en: x ? x.en : n }; };
    // 폴더 이름: 그림 경로 앞부분 → .ito 파일 이름 순
    const anyPath = SLOTS.map(x => (x.group === "status" ? S2 : C)[x.key]).find(v => v && v.includes("\\"));
    let folder = anyPath ? anyPath.split("\\")[0] : ito.name.replace(/\.ito$/i, "");
    let fname = folder.toLowerCase().startsWith(FOLDER_PREFIX) ? folder.slice(FOLDER_PREFIX.length) : folder;
    const clean = fname.toLowerCase().replace(/[^a-z0-9_]/g, ""); if (clean !== fname) this.log("폴더 이름 '" + folder + "'에 쓸 수 없는 글자가 있어 '" + FOLDER_PREFIX + clean + "'(으)로 바꿨습니다.", true);
    const live = {}; const pathMap = {}; const missList = []; let miss = 0, got = 0;
    for (const x of SLOTS) {
      const path = (x.group === "status" ? S2 : C)[x.key]; if (!path) continue;
      const base = path.split(/[\\/]/).pop().toLowerCase(); pathMap[base] = x.key; if (!withImages) continue; const f = findImg(path);
      if (!f) { miss++; missList.push(base); continue; }
      live[x.key] = await this.readSlotImage(f, x); got++;
    }
    const patch = { pathMap, folder: FOLDER_PREFIX + clean, stats, packA: pk(C.perkpack_a), packB: pk(C.perkpack_b), extraIto: extra.join("\n"),
      info: { name: C.name || "", author: C.author || "", contact: C.contact || "", tag: unhash(C.menu_tag), na: C.name_a || "", nb: C.name_b || "", desc: unhash(C.menu_desc) },
      bonusA: findB(B2.type_a, B2.name_a), bonusB: findB(B2.type_b, B2.name_b),
      exportLang: [B2.name_a, B2.name_b].some(n => n && /[가-힣]/.test(n)) ? "ko" : (B2.name_a || B2.name_b ? "en" : this.state.exportLang) };
    if (withImages) this.resetTo({ ...patch, live }, ito.name + "을(를) 불러왔습니다. 그림 " + got + "장" + (miss ? ", 찾지 못한 그림 " + miss + "장" : "") + ".");
    else { this.setState({ ...patch, unlocked: {} }); this.log(ito.name + "의 글·능력치·퍽·보너스를 불러왔습니다. 그림은 지금 것을 그대로 둡니다. 그림도 바꾸려면 '그림 불러오기'를 써주세요.", false); }
    if (missList.length) this.log("경로는 적혀 있으나 찾지 못한 그림: " + missList.slice(0, 5).join(", ") + (missList.length > 5 ? " 외 " + (missList.length - 5) + "장" : "") + ". 빈 칸으로 둡니다.", true);
    if (quoteFix) this.log("닫는 따옴표가 빠진 줄이 " + quoteFix + "개 있었습니다. 내보낼 때 바로잡습니다.", true);
    if (extra.length) this.log("편집기가 다루지 않는 섹션(예: [linked_events])은 그대로 보존해 내보냅니다.", false);
  }

  // ---------- zip 내보내기 ----------
  exportZip = async (force) => {
    const st = this.state; const name = st.folder.slice(FOLDER_PREFIX.length);
    if (force !== true && name && (!st.packA || !st.packB || !st.bonusA || !st.bonusB)) { this.setState({ exportAsk: true }); return; }
    if (this.state.exportAsk) this.setState({ exportAsk: false });
    if (!name) { this.log("폴더 이름이 비어 있습니다. 위쪽 '폴더' 칸에 캐릭터 이름을 적어주세요.", true); return; }
    if (!st.info.name) this.log("이름(name)이 비어 있습니다. 그대로 내보냅니다.", true);
    if (!st.live.portrait_b) this.log("초상화 B가 비어 있습니다. 게임에서 두 번째 의상을 볼 때 종료될 수 있습니다.", true);
    if (typeof JSZip === "undefined") { this.log("zip 내려받기는 실제 사이트에서 동작합니다. (시안 화면에서는 꺼져 있습니다)", true); return; }
    const zip = new JSZip(); const dir = zip.folder(st.folder);
    for (const x of SLOTS) { const src = st.live[x.key]; if (!src) continue;
      const { blob, clear } = await this.greenBlob(src, x.w, x.h, x.key === "sprite_icon"); dir.file(x.key + ".png", blob);
      if (x.key === "sprite_icon" && clear) this.log("아이콘에 투명한 픽셀이 " + clear + "개 있습니다. 아이콘은 투명 처리가 안 되니 채워주세요.", true); }
    const bytes = new TextEncoder().encode(this.itoLines(st).join("\r\n") + "\r\n");
    zip.file(st.folder + ".ito", bytes);
    const out = await zip.generateAsync({ type: "blob" });
    this.download(out, st.folder + ".zip");
    this.log(st.folder + ".zip을 내려받았습니다. 압축을 풀어 게임의 character 폴더에 넣어주세요.", false);
  };
  download(blob, filename) { const a = document.createElement("a"); a.href = URL.createObjectURL(blob); a.download = filename; document.body.appendChild(a); a.click();
    setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 1000); }
  // ---------- 작업 파일 / 자동 저장 ----------
  snapshotSave(st = this.state) { const o = { v: 1, savedAt: Date.now() }; SAVE_FIELDS.forEach(k => { o[k] = st[k]; }); return o; }
  applySave(o, msg) { if (!o || o.v !== 1) { this.log("작업 파일 형식을 알 수 없습니다.", true); return; }
    const patch = {}; SAVE_FIELDS.forEach(k => { if (k in o) patch[k] = o[k]; }); this.resetTo(patch, msg); }
  saveWork = () => { const blob = new Blob([JSON.stringify(this.snapshotSave())], { type: "application/json" });
    this.download(blob, (this.state.folder || "character_") + ".wohwork.json"); this.log("작업 파일을 내려받았습니다. 나중에 '작업 파일 열기'로 이어서 할 수 있습니다.", false); };
  setWorkInput = (el) => { this.workInput = el; };
  openWork = () => { if (this.workInput) { this.workInput.value = ""; this.workInput.click(); } };
  onWorkFile = async (e) => { const f = (e.target.files || [])[0]; if (!f) return;
    try { this.applySave(JSON.parse(await f.text()), f.name + "을(를) 열었습니다."); } catch (err) { this.log("작업 파일을 읽지 못했습니다.", true); } };
  idb(mode, fn) { return new Promise((res, rej) => { try { const rq = indexedDB.open("woh-workshop", 1);
      rq.onupgradeneeded = () => rq.result.createObjectStore("kv"); rq.onerror = () => rej(rq.error);
      rq.onsuccess = () => { const tx = rq.result.transaction("kv", mode); const r = fn(tx.objectStore("kv")); tx.oncomplete = () => res(r && r.result); tx.onerror = () => rej(tx.error); }; } catch (err) { rej(err); } }); }
  autoSave() { clearTimeout(this.saveT); this.saveT = setTimeout(() => { this.idb("readwrite", s2 => s2.put(this.snapshotSave(), "autosave")).catch(() => {}); }, 1200); }
  async autoLoad() { try { const o = await this.idb("readonly", s2 => s2.get("autosave"));
      if (o && o.v === 1 && Object.keys(o.live || {}).length) this.applySave(o, "지난번 작업을 자동으로 이어서 불러왔습니다. (" + new Date(o.savedAt).toLocaleString() + ")"); } catch (err) {} }
  // ---------- 직선 · 사각형 ----------
  shapeDraw(x, y) { const sh = this.shape; if (!sh) return; const ctx = this.cv.getContext("2d"); ctx.putImageData(sh.base, 0, 0);
    const line = (x0, y0, x1, y1) => { let dx = Math.abs(x1 - x0), dy = -Math.abs(y1 - y0), sx = x0 < x1 ? 1 : -1, sy = y0 < y1 ? 1 : -1, err = dx + dy;
      for (let n = 0; n < 4000; n++) { this.plot(x0, y0); if (x0 === x1 && y0 === y1) break; const e2 = 2 * err; if (e2 >= dy) { err += dy; x0 += sx; } if (e2 <= dx) { err += dx; y0 += sy; } } };
    if (sh.kind === "line") line(sh.x, sh.y, x, y);
    else { line(sh.x, sh.y, x, sh.y); line(x, sh.y, x, y); line(x, y, sh.x, y); line(sh.x, y, sh.x, sh.y); } }
  bonInfo(b, lang) {
    if (!b || !b.t) return { t: "", n: "", label: "(없음)", eff: "", sub: "" };
    const cat = (BONUS_CATS.find(x => x[0] === b.t) || ["", ""])[1];
    if (BONUS_DB[b.t]) { const x = BONUS_DB[b.t].find(y => y.en === b.en);
      return x ? { t: b.t, n: lang === "en" ? x.en : x.ko, label: cat + ": " + x.ko, eff: x.eff, sub: x.sub + " · " + x.en } : { t: b.t, n: b.en, label: cat + ": " + b.en, eff: "", sub: "" }; }
    const v = Number(b.v) || 0;
    return { t: b.t, n: String(v), label: cat + ": " + (v >= 0 ? "+" : "") + v, eff: NUM_DESC[b.t] || "", sub: "숫자 보너스" };
  }
  showTip(el, title, sub, body) {
    if (!el || !this.root) return; const r = el.getBoundingClientRect(), R = this.root.getBoundingClientRect(); const W = this.root.offsetWidth || 1280, Hh = this.root.offsetHeight || 720; const k = R.width / W || 1;
    let x = (r.right - R.left) / k + 10; if (x + 244 > W - 4) x = (r.left - R.left) / k - 254; x = Math.max(4, x);
    let y = (r.top - R.top) / k; y = Math.max(4, Math.min(y, Hh - 130));
    this.setState({ tip: { x: Math.round(x), y: Math.round(y), title, sub, body } });
  }
  hideTip = () => { if (this.state.tip) this.setState({ tip: null }); };
  bonusVals(st, inv, c) {
    const lockWhy = (x) => { const a = x.sub.includes("업적 해금"), b = x.sub.includes("전용");
      return a && b ? "기본 캐릭터 전용이면서 업적으로 해금해야 하는 보너스" : a ? "업적으로 해금해야 하는 보너스" : "기본 캐릭터 전용 보너스"; };
    const tgt = st.bonusTarget; const isAll = st.bonusCat === "all"; const isNum = !isAll && !BONUS_DB[st.bonusCat];
    const catKo = (id) => (BONUS_CATS.find(x => x[0] === id) || ["", ""])[1];
    const q = st.bonusQuery.trim().toLowerCase();
    const cur = tgt === "a" ? st.bonusA : st.bonusB;
    const pool = isNum ? [] : isAll ? Object.keys(BONUS_DB).flatMap(k => BONUS_DB[k].map(x => ({ ...x, cat: k }))) : BONUS_DB[st.bonusCat].map(x => ({ ...x, cat: st.bonusCat }));
    const list = pool.filter(x => !q || x.ko.toLowerCase().includes(q) || x.en.toLowerCase().includes(q));
    const setB = (val) => { const other = tgt === "a" ? "bonusB" : "bonusA";
      this.setState(x => ({ [tgt === "a" ? "bonusA" : "bonusB"]: val, bonusTarget: tgt === "a" && !x.bonusB ? "b" : x.bonusTarget }));
      this.log("보너스 " + tgt.toUpperCase() + "에 넣었습니다: " + this.bonInfo(val).label, false); };
    const same = (b, x) => b && b.t === x.cat && b.en === x.en;
    const clearB = (slot) => { const k = slot === "a" ? "bonusA" : "bonusB"; if (!st[k]) return; this.setState({ [k]: null, bonusTarget: slot }); this.log("보너스 " + slot.toUpperCase() + "를 비웠습니다.", false); };
    const slotBtn = (slot, key) => { const b = this.bonInfo(st[key]); const on = tgt === slot;
      return { slot: slot.toUpperCase(), label: b.label, on, ...inv(on), border: on ? "3px solid " + c.ink : "2px solid " + c.ink,
        pick: () => this.setState({ bonusTarget: slot }),
        enter: (e) => this.showTip(e.currentTarget, "보너스 " + slot.toUpperCase() + " · " + b.label, b.sub, b.eff || "효과 정보가 없습니다."),
        go: () => this.setState({ mode: "perk", perkView: "bonus", bonusTarget: slot, bonusCat: st[key] && st[key].t ? st[key].t : st.bonusCat }) }; };
    const A = slotBtn("a", "bonusA"), B = slotBtn("b", "bonusB");
    return {
      bonusSlots: [A, B], bonusBtnA: A, bonusBtnB: B, targetSlot: tgt.toUpperCase(),
      bonusCats: BONUS_CATS.map(([id, label]) => ({ label, ...inv(st.bonusCat === id), pick: () => this.setState({ bonusCat: id, bonusQuery: "", confirm: null }) })),
      bonusQuery: st.bonusQuery, onBonusQuery: (e) => this.setState({ bonusQuery: e.target.value }),
      isNumCat: isNum, numLabel: (BONUS_CATS.find(x => x[0] === st.bonusCat) || ["",""])[1], numVal: isNum ? st.numVals[st.bonusCat] : 0,
      numDesc: NUM_DESC[st.bonusCat] || "",
      onNum: (e) => { const v = e.target.value; this.setState(x => ({ numVals: { ...x.numVals, [x.bonusCat]: v } })); },
      applyNum: () => setB({ t: st.bonusCat, v: Number(st.numVals[st.bonusCat]) || 0 }),
      bonusItems: list.map(x => { const on = cur && cur.t === x.cat && cur.en === x.en; const key = x.cat + "|" + x.en; const pre = !isAll ? "" : x.cat === "item" ? "아이템" : x.cat === "injury" ? "부상" : (x.cat === "spell" && !x.sub.includes("주문")) ? "주문" : ""; const sub0 = pre ? pre + " · " + x.sub : x.sub;
        const locked = x.lock && !st.unlocked[key]; const why = lockWhy(x);
        const col = locked ? { bg: "color-mix(in srgb, " + c.mid + " 32%, " + c.paper + ")", fg: "color-mix(in srgb, " + c.ink + " 60%, " + c.mid + ")" } : inv(on);
        return { ko: x.ko, sub: locked ? (isAll ? catKo(x.cat) + " · " : "") + "잠김 · " + why : (x.lock ? "해금됨 · " + sub0 : sub0), locked, ...col,
          border: on ? "3px solid " + c.ink : (locked ? "1px solid " + c.mid : "1px solid " + c.ink),
          pick: () => locked ? this.setState({ confirm: { cat: x.cat, en: x.en, ko: x.ko, why, cond: x.cond || "기본 캐릭터" }, tip: null }) : (same(st.bonusA, x) ? clearB("a") : same(st.bonusB, x) ? clearB("b") : setB({ t: x.cat, en: x.en })),
          enter: (e) => locked ? this.showTip(e.currentTarget, x.ko, "잠김 · " + why, "효과는 해금 전까지 숨겨 둡니다. 클릭하면 사용 여부를 묻습니다.")
                               : this.showTip(e.currentTarget, x.ko, sub0 + " · " + x.en, x.eff || "효과 정보가 없습니다.") }; }),
      hasConfirm: !!st.confirm, confirmName: st.confirm ? st.confirm.ko : "",
      confirmFlow: st.confirm ? "■ 잠긴 보너스 ■ " + st.confirm.cond + " 전용 ■ 재미가 반감될 수 있습니다 ■ 잠긴 보너스 ■ " + st.confirm.cond + " 전용 ■ 재미가 반감될 수 있습니다" : "",
      confirmText: st.confirm ? "'" + st.confirm.ko + "'은(는) '" + st.confirm.cond + "' 전용 보너스입니다. 보너스로 들고 가면 얻는 재미가 반감될 수 있습니다. 그래도 괜찮으신가요?" : "",
      confirmYes: () => { const cf = st.confirm; if (!cf) return; this.setState(x => ({ unlocked: { ...x.unlocked, [cf.cat + "|" + cf.en]: true }, confirm: null })); this.log("잠긴 보너스를 풀었습니다: " + cf.ko, true); setB({ t: cf.cat, en: cf.en }); },
      confirmNo: () => this.setState({ confirm: null }),
      bonusFoot: isNum ? "숫자 보너스는 위 칸에 값을 넣고 버튼을 눌러주세요." : list.length + "개" + (st.bonusCat === "item" || isAll ? " · 퀘스트 아이템과 오류를 일으키는 아이템은 목록에서 뺐습니다." : ""),
      viewPacks: () => this.setState({ perkView: "packs" }), viewBonus: () => this.setState({ perkView: "bonus" }),
      pvA: inv(st.perkView === "packs"), pvB: inv(st.perkView === "bonus"),
      hasTip: !!st.tip, tipX: st.tip ? st.tip.x : 0, tipY: st.tip ? st.tip.y : 0,
      tipTitle: st.tip ? st.tip.title : "", tipSub: st.tip ? st.tip.sub : "", tipBody: st.tip ? st.tip.body : "", hideTip: this.hideTip
    };
  }
  togglePack(id) {
    const {packA, packB} = this.state; const p = PACKS.find(x => x[0] === id);
    if (packA === id) { this.setState({ packA: packB, packB: null }); this.log("퍽팩을 해제했습니다: " + p[1], false); }
    else if (packB === id) { this.setState({ packB: null }); this.log("퍽팩을 해제했습니다: " + p[1], false); }
    else if (!packA) { this.setState({ packA: id }); this.log("퍽팩을 선택했습니다: " + p[1], false); }
    else if (!packB) { this.setState({ packB: id }); this.log("퍽팩을 선택했습니다: " + p[1], false); }
    else this.log("팩은 2개까지 선택할 수 있습니다. 기존 팩을 먼저 해제해주세요.", true);
  }
  go(i) { const n = (i + SLOTS.length) % SLOTS.length; const k = SLOTS[n].key;
    this.setState(st => ({ tip: null, zoom: null, slot: n, mode: SLOTS[n].group, underWhich: k === "portrait_a" ? "a" : k === "portrait_b" ? "b" : st.underWhich })); }

  renderVals() {
    const st = this.state; const F = FILTERS[st.filter]; const c = F; const s = SLOTS[st.slot];
    const curL = this.slotLayers(st); const aIdx = this.activeIdx(st);
    const groupIdx = SLOTS.map((x, i) => i).filter(i => SLOTS[i].group === s.group); const gpos = groupIdx.indexOf(st.slot);
    const prevI = groupIdx[(gpos - 1 + groupIdx.length) % groupIdx.length], nextI = groupIdx[(gpos + 1) % groupIdx.length];
    const inv = (on) => on ? {bg:c.ink, fg:c.panel} : {bg:c.panel, fg:c.ink};
    const fitZoom = this.fitZoom(s); const zoom = st.zoom || fitZoom; this.curZoom = zoom;
    const has = (k) => !!st.live[k];
    const pathOf = (k) => has(k) ? st.folder + "\\" + k + ".png" : "";
    const filled = SLOTS.filter(x => has(x.key)).length;
    const pack = (id) => PACKS.find(p => p[0] === id);
    const q = qv;
    const lines = this.itoLines(st);
    const sum = STATS.reduce((a,[k]) => a + st.stats[k], 0);
    const statusList = SLOTS.filter(x => x.group === "status");
    const baseSrc = st.outfit === "a" ? (st.live.portrait_a || BLANK) : (st.live.portrait_b || BLANK);
    const isDraw = st.mode === "sprite" || st.mode === "status";
    const setInfo = (k) => (e) => { const v = e.target.value; this.setState(x => ({ info: {...x.info, [k]: v} })); };
    const pa = pack(st.packA), pb = pack(st.packB);
    const checker = "repeating-conic-gradient(#9e9e9e 0 25%,#ffffff 0 50%) 0 0 / 10px 10px";
    const fgRgb = st.color ? hex2rgb(st.color) : ["-","-","-"];
    const rad = st.h * Math.PI / 180;
    return {
      c, folder: st.folder, folderPrefix: FOLDER_PREFIX, folderName: st.folder.slice(FOLDER_PREFIX.length),
      onFolder: (e) => { const raw = e.target.value; const v = raw.toLowerCase().replace(/[^a-z0-9_]/g, "");
        if (v !== raw && !this.warnedFolder) { this.warnedFolder = true; this.log("폴더 이름에는 영어 소문자·숫자·밑줄(_)만 쓸 수 있습니다. 다른 글자는 자동으로 빠집니다.", true); }
        this.setState({ folder: FOLDER_PREFIX + v }); },
      goExport: () => this.setState({ mode:"export" }), setImportInput: this.setImportInput, openImport: this.openImport, onImportFiles: this.onImportFiles,
      setZipInput: this.setZipInput, setItoInput: this.setItoInput, setImgInput: this.setImgInput,
      onPickAuto: this.onPickAuto, onPickIto: this.onPickIto, onPickImg: this.onPickImg,
      importMenu: !!st.importMenu, imBtn: inv(!!st.importMenu), toggleImportMenu: () => this.setState({ importMenu: !this.state.importMenu }),
      importItems: [
        { label: "폴더째 불러오기", desc: ".ito 파일과 그림 폴더가 함께 든 폴더를 고릅니다. 게임의 character 폴더를 통째로 골라도 됩니다.", go: () => this.pick(this.importInput) },
        { label: "zip 불러오기", desc: "이 사이트에서 내려받은 zip이나, 캐릭터를 묶은 zip을 그대로 엽니다.", go: () => this.pick(this.zipInput) },
        { label: ".ito만 불러오기", desc: "이름·소개·능력치·퍽·보너스만 가져옵니다. 지금 그린 그림은 그대로 둡니다.", go: () => this.pick(this.itoInput) },
        { label: "그림만 불러오기", desc: "파일 이름이 칸 이름(portrait_a.png 등)이거나 불러온 .ito의 경로와 같으면 그 칸에 넣습니다. 한 장이면 지금 칸에 넣습니다.", go: () => this.pick(this.imgInput) } ],
      onDragOver: this.onDragOver, onDragLeave: this.onDragLeave, onDrop: this.onDrop, dragOver: !!st.dragOver,
      itoPick: !!st.itoPick, itoPickCount: st.itoPick ? st.itoPick.itos.length : 0,
      itoPickList: st.itoPick ? st.itoPick.itos.map((f, i) => ({ name: (f.dir ? f.dir + "/" : "") + f.name, go: () => this.pickIto(i) })) : [],
      cancelPick: () => this.setState({ itoPick: null }), exportAsk: !!st.exportAsk, askYes: () => this.exportZip(true), askNo: () => this.setState({ exportAsk: false }),
      setWorkInput: this.setWorkInput, openWork: this.openWork, onWorkFile: this.onWorkFile, saveWork: this.saveWork, exportZip: this.exportZip,
      newCharacter: this.newCharacter, loadSample: this.loadSample,
      langKo: () => this.setState({ exportLang: "ko" }), langEn: () => this.setState({ exportLang: "en" }),
      lkO: { on: st.exportLang !== "en", ...inv(st.exportLang !== "en") }, lEn: { on: st.exportLang === "en", ...inv(st.exportLang === "en") }, setLogBox: this.setLogBox, rootCls: st.tipsOff ? "tips-off" : "", tipsOff: st.tipsOff,
      toggleTips: () => this.setState(x => ({ tipsOff: !x.tipsOff })), toggleSound: this.toggleSound, soundOff: !st.soundOn, sndBtn: { label: st.soundOn ? "소리 끄기" : "소리 켜기", ...inv(!st.soundOn) }, tipBtn: { label: st.tipsOff ? "? 설명 켜기" : "? 설명 끄기", ...inv(st.tipsOff) }, undo: this.undo, redo: this.redo, setRoot: this.setRoot, onKey: this.onKey,
      filters: Object.keys(FILTERS).map(k => ({ label: FILTERS[k].label, ...inv(st.filter === k), pick: () => { this.setState({ filter:k }); this.log("필터를 '" + FILTERS[k].label + "'(으)로 바꾸었습니다. 필터 색감은 실제 인게임과 다를 수 있습니다.", false); } })),
      tools: TOOLS.map(t => { const on = t.id === "mirror" ? st.mirror : st.tool === t.id; return { ...t, ...inv(on),
        pick: () => t.id === "mirror" ? this.setState(x => ({ mirror: !x.mirror })) : this.setState({ tool: t.id }) }; }),
      titleLine: isDraw ? "Editing: " + s.key.toUpperCase() + " — " + s.label : st.mode === "info" ? "Editing: [character] 기본 정보" : st.mode === "perk" ? (st.perkView === "bonus" ? "Editing: 시작 보너스 [starting_bonus]" : "Editing: 퍽팩 [perkpack_a / perkpack_b]") : "Export: " + st.folder + ".ito",
      titleSize: isDraw ? s.w + "×" + s.h + " · ×" + zoom + (st.zoom ? "" : " (맞춤)") : "", isDrawMode: isDraw, zoomNow: zoom,
      setZoomBox: this.setZoomBox, zoomIn: () => this.zoomBy(1), zoomOut: () => this.zoomBy(-1), zoomFit: () => this.setState({ zoom: null }),
      onKeyUp: this.onKeyUp, boxCursor: st.panMode ? "grab" : "default",
      steps: STEPS.map(([id,label,tip]) => ({ label, tip, ...inv(st.mode === id), pick: () => {
        if (id === "sprite") this.go(st.mode === "sprite" ? 0 : 4);
        else if (id === "status") this.go(SLOTS.findIndex(x => x.group === "status"));
        else this.setState({ mode: id }); } })),
      drawDisplay: isDraw ? "flex" : "none", navDisplay: isDraw ? "grid" : "none", isInfo: st.mode === "info", isPerk: st.mode === "perk", isPerkPacks: st.mode === "perk" && st.perkView === "packs", isBonus: st.mode === "perk" && st.perkView === "bonus", isExport: st.mode === "export",
      listTitle: s.group === "status" ? "상태 덧그림 목록" : "스프라이트 목록",
      slotList: groupIdx.map(i => { const x = SLOTS[i]; const on = i === st.slot; const w = st.warn[x.key];
        return { label: x.label, tip: x.tip, size: x.w + "×" + x.h, mark: w ? "!" : has(x.key) ? "■" : "□", ...inv(on), pick: () => this.go(i) }; }),
      slotW: s.w, slotH: s.h, dispW: s.w * zoom, dispH: s.h * zoom, imgFilter: F.img,
      edgeColor: st.warn[s.key] ? "#ff2a55" : c.ink,
      showUnder: s.group === "status" && st.under && st.underPct > 0,
      underSrc: st.underWhich === "b" ? (st.live.portrait_b || BLANK) : (st.live.portrait_a || BLANK),
      underOp: st.underPct / 100, underPct: st.underPct, underOn: st.under, underDisabled: !st.under,
      onUnderOp: (e) => this.setState({ underPct: Number(e.target.value) }),
      underA: () => this.setState({ underWhich: "a", under: true }), underB: () => this.setState({ underWhich: "b", under: true }),
      ubA: { on: st.under && st.underWhich === "a", ...inv(st.under && st.underWhich === "a") }, ubB: { on: st.under && st.underWhich === "b", ...inv(st.under && st.underWhich === "b") },
      ubOff: inv(!st.under), isStatusSlot: s.group === "status", isSpriteSlot: s.group !== "status",
      layerCanvases: curL.map((x, i) => ({ ref: this.layerRef(i), display: x.visible ? "block" : "none" })),
      layerRows: curL.map((x, i) => ({ name: x.name, active: i === aIdx, visible: x.visible, ...inv(i === aIdx), eye: x.visible ? "●" : "○", eyeLabel: x.visible ? "숨기기" : "보이기",
        pick: () => this.layerOp("pick", i), vis: () => this.layerOp("vis", i), up: () => this.layerOp("up", i), down: () => this.layerOp("down", i), del: () => this.layerOp("del", i) })).reverse(),
      layerCount: curL.length, noAdd: curL.length >= 3, addOp: curL.length >= 3 ? 0.4 : 1, addLayer: () => this.layerOp("add"),
      isChibi: s.key === "sprite_chibi", chibiGuide: 3 * zoom,
      pDown: this.pDown, pMove: this.pMove, pUp: this.pUp, noMenu: this.noMenu,
      ringDown: this.ringDown, sqDown: this.sqDown, pickMove: this.pickMove, pickUp: this.pickUp,
      hueCss: hsv2hex(st.h, 1, 1), hueNow: Math.round(st.h), svNow: Math.round(st.s * 100) + "/" + Math.round(st.v * 100),
      ringX: Math.round(60 + 52 * Math.sin(rad)), ringY: Math.round(60 - 52 * Math.cos(rad)),
      sqX: Math.round(st.s * 60), sqY: Math.round((1 - st.v) * 60),
      fgCss: st.color || checker, bgCss: st.color2 || checker, bgName: st.color2Name,
      rgb: { r: fgRgb[0], g: fgRgb[1], b: fgRgb[2] }, swap: this.swap,
      pickClear: () => this.setFg(null, "투명 (#40FF40)"),
      swatches: SWATCHES.map(w => { const on = st.color === w.v && st.tool !== "eraser";
        return { name: w.name, tip: w.tip || "게임 기본 그림에 쓰이는 회색 단계입니다.", css: w.v === null ? checker : w.v,
          border: on ? "3px solid " + c.ink : "1px solid " + c.mid, pick: () => this.setFg(w.v, w.name) }; }),
      colorName: st.tool === "eraser" ? "투명 (지우개)" : st.colorName,
      toggleUnder: () => this.setState(x => ({ under: !x.under })),
      underLabel: st.under ? "끄기" : "꺼짐",
      layerName: s.group === "status" ? s.label + " 덧그림" : (curL[aIdx] ? curL[aIdx].name : s.label),
      info: st.info, tagOut: "menu_tag=" + q(toHash(st.info.tag)), descOut: "menu_desc=" + q(toHash(st.info.desc)), onInfo: { name: setInfo("name"), author: setInfo("author"), contact: setInfo("contact"), tag: setInfo("tag"), na: setInfo("na"), nb: setInfo("nb"), desc: setInfo("desc") },
      packCards: PACKS.map(p => { const on = st.packA === p[0] || st.packB === p[0]; const ov = st.over[p[0]] || 0;
        return { en: "내보낼 이름: [" + p[0] + "]", ko: p[1], p1: p[2], p2: p[3], tagline: p[4] ? "커스텀 전용" : "", on,
        bg: on ? c.paper : c.panel, border: on ? "3px solid " + c.ink : "2px solid " + c.ink,
        btnLabel: on ? "✓ 선택됨" : "선택", btnBg: on ? c.ink : c.paper, btnFg: on ? c.panel : c.ink,
        toggle: () => this.togglePack(p[0]),
        over: ov, anim: ov > 0 ? "pk-scroll" : "none", dur: Math.round((3 + ov / 8) * 10) / 10,
        full: p[2] + " / " + p[3], n1: p[2].split(": ")[0], e1: p[2].slice(p[2].indexOf(": ") + 2), n2: p[3].split(": ")[0], e2: p[3].slice(p[3].indexOf(": ") + 2), measure: (el) => this.measurePack(p[0], el) }; }),
      packCount: [st.packA, st.packB].filter(Boolean).length,
      packChosen: [st.packA, st.packB].filter(Boolean).map(id => { const p = pack(id); return p ? p[1] + " [" + id + "]" : id; }).join(" · ") || "아직 선택한 팩이 없습니다.",
      goPerk: () => this.setState({ mode: "perk" }),
      itoText: lines.join("\n"), filledCount: filled,
      prevLabel: "이전 칸: " + SLOTS[prevI].label,
      nextLabel: "다음 칸: " + SLOTS[nextI].label,
      prev: () => this.go(prevI), next: () => this.go(nextI),
      logs: st.logs.map(l => ({ ...l, color: l.warn ? "#ff8fd0" : c.panel })),
      infoTitle: isDraw ? s.key.toUpperCase() + " · " + s.label : "현재 단계",
      infoLine: isDraw ? s.key + "=" + q(pathOf(s.key)) : "퍽팩·보너스·능력치는 이 패널에서 바로 수정할 수 있습니다.",
      infoNote: isDraw ? s.note : "",
      packAVal: st.packA || "", packBVal: st.packB || "",
      packOpts: [{ id: "", label: "(선택 안 함)" }].concat(PACKS.map(p => ({ id: p[0], label: p[1] + " [" + p[0] + "]" }))),
      onPackA: (e) => { const v = e.target.value || null; this.setState(x => ({ packA: v, packB: v && x.packB === v ? null : x.packB })); },
      onPackB: (e) => { const v = e.target.value || null; this.setState(x => ({ packB: v, packA: v && x.packA === v ? null : x.packA })); },
      ...this.bonusVals(st, inv, c),
      perkLines: [pa, pb].filter(Boolean).flatMap(p => [p[2], p[3]]).map(t => { const i = t.indexOf(":"); return { name: t.slice(0,i), eff: t.slice(i+1) }; }),
      sta: st.active.low_stamina ? 9 : 17, rea: st.active.low_reason ? 9 : 16,
      leftStats: [0,1,2,5].map(i => this.statRow(i)), rightStats: [4,3].map(i => this.statRow(i)),
      fnd: [st.bonusA, st.bonusB].reduce((a, b) => a + (b && b.t === "funds" ? (Number(b.v) || 0) : 0), 0),
      statSum: sum,
      outfitA: () => this.setState({ outfit:"a", underWhich:"a" }), outfitB: () => this.setState({ outfit:"b", underWhich:"b" }),
      oa: inv(st.outfit === "a"), ob: inv(st.outfit === "b"),
      previewBase: baseSrc,
      overlays: statusList.filter(x => st.active[x.key] && st.live[x.key]).map(x => ({ src: st.live[x.key] })),
      statusToggles: statusList.map(x => { const on = !!st.active[x.key]; const empty = !has(x.key);
        return { label: x.btn, tip: x.tip + (empty ? " 아직 그림이 없습니다." : ""), title: x.label, on, ...inv(on),
          border: empty ? "1px dashed " + c.mid : "1px solid " + c.ink,
          toggle: () => { this.setState(y => ({ active: {...y.active, [x.key]: !y.active[x.key]} })); if (!on && empty) this.log(x.key + ": 그림이 없어 미리보기에 표시되지 않습니다.", true); } }; })
    };
  }
  render() { const v = this.renderVals(); return html`<div ref=${v.setRoot} class=${v.rootCls} tabIndex="0" onKeyDown=${v.onKey} onKeyUp=${v.onKeyUp} onDragOver=${v.onDragOver} onDragLeave=${v.onDragLeave} onDrop=${v.onDrop} aria-label="캐릭터 편집기" style="--ink:${v.c.ink};--panel:${v.c.panel};--mid:${v.c.mid};position:relative;outline:none;width:100%;height:100vh;min-width:1280px;min-height:720px;font-family:Galmuri11,monospace;font-size:12px;line-height:16px;color:${v.c.ink};background:${v.c.paper};display:flex;flex-direction:column;overflow:hidden">

<svg width="0" height="0" aria-hidden="true" style="position:absolute;width:0;height:0;overflow:hidden"><defs>
<filter id="woh-dusk" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
<feColorMatrix in="SourceGraphic" type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" result="gray"></feColorMatrix>
<feComponentTransfer in="gray" result="mapped"><feFuncR type="linear" slope="0.7608" intercept="0.1412"></feFuncR><feFuncG type="linear" slope="0.7647" intercept="0.1529"></feFuncG><feFuncB type="linear" slope="0.7333" intercept="0.1961"></feFuncB></feComponentTransfer>
<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.7843  0 0 0 0 0.7882  0 0 0 0 0.7451  12 -24 12 0 -14" result="acc"></feColorMatrix>
<feComposite in="acc" in2="mapped" operator="over"></feComposite>
</filter>
<filter id="woh-neon" color-interpolation-filters="sRGB" x="0" y="0" width="100%" height="100%">
<feColorMatrix in="SourceGraphic" type="matrix" values="0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0.299 0.587 0.114 0 0  0 0 0 1 0" result="gray"></feColorMatrix>
<feComponentTransfer in="gray" result="mapped"><feFuncR type="linear" slope="0.2078" intercept="0.0314"></feFuncR><feFuncG type="linear" slope="0.4000" intercept="0.0627"></feFuncG><feFuncB type="linear" slope="0.4431" intercept="0.0706"></feFuncB></feComponentTransfer>
<feColorMatrix in="SourceGraphic" type="matrix" values="0 0 0 0 0.8510  0 0 0 0 0.1412  0 0 0 0 0.3176  12 -24 12 0 -14" result="acc"></feColorMatrix>
<feComposite in="acc" in2="mapped" operator="over"></feComposite>
</filter>
</defs></svg>
${(v.hasTip) ? html`
<div class="ftip" role="tooltip" style="left:${v.tipX}px;top:${v.tipY}px"><b>${v.tipTitle}</b><div style="font-size:10px;opacity:0.8">${v.tipSub}</div><div style="padding-top:3px">${v.tipBody}</div></div>
` : null}

<div style="height:34px;flex-shrink:0;display:flex;align-items:center;gap:6px;padding:0 8px;border-bottom:2px solid ${v.c.ink};background:${v.c.panel};white-space:nowrap">
<span style="font-weight:700;padding:2px 6px;background:${v.c.ink};color:${v.c.panel}">캐릭터 공방</span>
<div class="tip-wrap" style="align-items:center;gap:6px"><label for="folder" style="padding-left:4px">폴더</label>
<span style="display:flex;align-items:center;height:22px;border:2px solid ${v.c.ink};background:${v.c.paper}"><span style="padding:0 0 0 4px;color:${v.c.mid}">${v.folderPrefix}</span><input id="folder" value=${v.folderName} onInput=${v.onFolder} placeholder="이름" style="width:96px;height:18px;border:0;outline:none;background:transparent;color:${v.c.ink};padding:0 4px 0 0" /></span><div class="tip b" role="tooltip"><b>캐릭터 폴더 이름</b><br />앞의 character_는 고정이고, 뒤에 캐릭터 이름만 적으면 됩니다. 영어 소문자·숫자·밑줄(_)만 쓸 수 있습니다.<br />예: ${v.folder}\\portrait_a.png<br />완성한 zip은 게임의 character 폴더에 풀어 넣습니다.</div></div>
<input ref=${v.setImportInput} type="file" webkitdirectory multiple onInput=${v.onImportFiles} aria-hidden="true" tabIndex="-1" style="display:none" /><input ref=${v.setZipInput} type="file" accept=".zip,application/zip" onInput=${v.onPickAuto} aria-hidden="true" tabIndex="-1" style="display:none" /><input ref=${v.setItoInput} type="file" accept=".ito" onInput=${v.onPickIto} aria-hidden="true" tabIndex="-1" style="display:none" /><input ref=${v.setImgInput} type="file" accept="image/png" multiple onInput=${v.onPickImg} aria-hidden="true" tabIndex="-1" style="display:none" /><input ref=${v.setWorkInput} type="file" accept=".json,application/json" onInput=${v.onWorkFile} aria-hidden="true" tabIndex="-1" style="display:none" />
<div style="position:relative"><button type="button" onClick=${v.toggleImportMenu} aria-expanded=${v.importMenu} style="height:24px;border:2px solid ${v.c.ink};background:${v.imBtn.bg};color:${v.imBtn.fg};padding:0 8px;cursor:pointer">불러오기 ▾</button>
${(v.importMenu) ? html`
<div aria-hidden="true" onClick=${v.toggleImportMenu} style="position:fixed;inset:0;z-index:79"></div>
<div role="menu" style="position:absolute;left:0;top:28px;z-index:80;width:300px;white-space:normal;word-break:keep-all;background:${v.c.panel};border:2px solid ${v.c.ink};box-shadow:4px 4px 0 ${v.c.mid};display:flex;flex-direction:column">
${(v.importItems || []).map((m, $index) => html`
<button type="button" role="menuitem" onClick=${m.go} style="text-align:left;border:0;border-bottom:1px solid ${v.c.mid};background:${v.c.panel};color:${v.c.ink};padding:6px 8px;cursor:pointer;display:flex;flex-direction:column;gap:2px"><b style="font-size:12px">${m.label}</b><span style="font-size:10px;line-height:13px;color:${v.c.mid}">${m.desc}</span></button>
`)}
<div style="padding:6px 8px;font-size:10px;line-height:13px;background:${v.c.ink};color:${v.c.panel}">폴더·zip·.ito·그림을 화면 아무 곳에나 끌어다 놓아도 불러옵니다.</div>
</div>
` : null}
</div>
<div class="tip-wrap"><button type="button" onClick=${v.goExport} style="height:24px;border:2px solid ${v.c.ink};background:${v.c.ink};color:${v.c.panel};padding:0 8px;cursor:pointer">.zip 내보내기</button><div class="tip b" role="tooltip"><b>.zip 내보내기</b><br />.ito 파일과 그림을 경로에 맞춰 하나로 묶습니다. 그림 파일 이름은 칸 이름으로 정리됩니다.</div></div>
<span style="width:2px;height:20px;background:${v.c.ink};margin:0 2px"></span>
<button type="button" onClick=${v.undo} title="되돌리기 (Ctrl+Z)" style="height:24px;border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};padding:0 6px;cursor:pointer">↶ 되돌리기 ^Z</button>
<button type="button" onClick=${v.redo} title="다시하기 (Ctrl+Y)" style="height:24px;border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};padding:0 6px;cursor:pointer">↷ 다시하기 ^Y</button>
<button type="button" onClick=${v.toggleSound} aria-pressed=${v.soundOff} title="키보드를 칠 때와 단추를 누를 때 소리를 냅니다" style="height:24px;border:2px solid ${v.c.ink};padding:0 8px;cursor:pointer;background:${v.sndBtn.bg};color:${v.sndBtn.fg}">${v.sndBtn.label}</button>
<button type="button" onClick=${v.toggleTips} aria-pressed=${v.tipsOff} style="height:24px;border:2px solid ${v.c.ink};padding:0 8px;cursor:pointer;background:${v.tipBtn.bg};color:${v.tipBtn.fg}">${v.tipBtn.label}</button>
<span style="flex-grow:1"></span>
<div class="tip-wrap"><span>필터</span><div class="tip bl" role="tooltip" style="width:240px"><b>게임 색상 필터 미리보기</b><br />게임 옵션의 색상 필터를 씌워 봅니다. 그림 속 #FF40FE 마젠타는 필터마다 포인트 색으로 바뀝니다. 필터 색감은 실제 인게임과 다를 수 있습니다.</div></div>
${(v.filters || []).map((f, $index) => html`
<button type="button" onClick=${f.pick} style="height:24px;border:2px solid ${v.c.ink};padding:0 8px;cursor:pointer;background:${f.bg};color:${f.fg}">${f.label}</button>
`)}
<span title="필터 색감은 실제 인게임과 다를 수 있습니다." style="font-size:11px;line-height:12px;color:${v.c.mid};padding-left:4px;white-space:nowrap;width:150px;flex-shrink:0">필터 색감은 실제 인게임과<br />다를 수 있습니다.</span>
</div>

<div style="flex-grow:1;display:flex;min-height:0">


<div style="flex:1 1 auto;min-width:0;display:flex;flex-direction:column;border-right:2px solid ${v.c.ink}">
<div style="flex-grow:1;display:flex;min-height:0">


<div style="width:48px;flex-shrink:0;border-right:2px solid ${v.c.ink};background:${v.c.panel};display:flex;flex-direction:column;align-items:center;gap:4px;padding-top:8px">
${(v.tools || []).map((t, $index) => html`
<div class="tip-wrap"><button type="button" onClick=${t.pick} aria-label=${t.name} aria-describedby="tip-${t.id}" style="width:36px;height:36px;border:2px solid ${v.c.ink};cursor:pointer;display:flex;flex-direction:column;align-items:center;justify-content:center;line-height:12px;padding:0;background:${t.bg};color:${t.fg}"><span style="font-weight:700;font-size:13px">${t.glyph}</span><span style="font-size:9px">${t.key}</span></button><div class="tip" role="tooltip" id="tip-${t.id}"><div style="font-weight:700;font-size:12px">${t.name}<span class="tip-key">${t.key}</span></div><div style="padding-top:2px">${t.desc}</div></div></div>
`)}
</div>


<div style="flex-grow:1;display:flex;flex-direction:column;padding:8px;gap:6px;min-width:0">
<div style="display:flex;align-items:center;gap:8px;background:${v.c.ink};color:${v.c.panel};padding:0 8px;height:24px;flex-shrink:0">
<span style="font-weight:700">${v.titleLine}</span>
<span style="flex-grow:1"></span>
<span>${v.titleSize}</span>
${(v.isDrawMode) ? html`
<div class="tip-wrap" style="gap:2px;margin-left:4px">
<button type="button" onClick=${v.zoomOut} aria-label="축소" style="width:22px;height:18px;padding:0;border:1px solid ${v.c.panel};background:${v.c.ink};color:${v.c.panel};cursor:pointer">-</button>
<button type="button" onClick=${v.zoomFit} style="height:18px;padding:0 6px;border:1px solid ${v.c.panel};background:${v.c.ink};color:${v.c.panel};cursor:pointer">맞춤</button>
<button type="button" onClick=${v.zoomIn} aria-label="확대" style="width:22px;height:18px;padding:0;border:1px solid ${v.c.panel};background:${v.c.ink};color:${v.c.panel};cursor:pointer">+</button>
<div class="tip bl" role="tooltip" style="width:230px"><b>확대 · 축소</b><br />캔버스 위에서 마우스 휠을 굴리면 커서 위치를 중심으로 확대·축소합니다. 키보드 + / - 로도 되고, 0은 화면에 맞춥니다.<br />스페이스바를 누른 채 끌거나 휠 버튼으로 끌면 화면을 옮깁니다.</div>
</div>
` : null}
</div>

<div style="display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:4px;flex-shrink:0">
${(v.steps || []).map((s, $index) => html`
<div class="tip-wrap" style="display:block"><button type="button" onClick=${s.pick} style="width:100%;height:28px;border:2px solid ${v.c.ink};cursor:pointer;background:${s.bg};color:${s.fg}">${s.label}</button><div class="tip b" role="tooltip">${s.tip}</div></div>
`)}
</div>


<div style="flex-grow:1;min-height:0;display:${v.drawDisplay};gap:8px">


<div style="width:160px;flex-shrink:0;border:2px solid ${v.c.ink};background:${v.c.panel};display:flex;flex-direction:column;min-height:0">
<div style="padding:2px 6px;background:${v.c.ink};color:${v.c.panel};font-weight:700">${v.listTitle}</div>
<div style="flex-grow:1">
${(v.slotList || []).map((s, $index) => html`
<div class="tip-wrap" style="display:block"><button type="button" onClick=${s.pick} style="width:100%;height:24px;display:flex;gap:6px;align-items:center;border:0;border-bottom:1px solid ${v.c.mid};padding:0 6px;text-align:left;cursor:pointer;background:${s.bg};color:${s.fg}"><span style="width:12px;font-weight:700">${s.mark}</span><span>${s.label}</span></button><div class="tip" role="tooltip"><b>${s.label}</b> <span class="tip-key">${s.size}</span><br />${s.tip}</div></div>
`)}
</div>
<div style="padding:3px 6px;border-top:2px solid ${v.c.ink};font-size:11px;line-height:14px">■ 채움 □ 빔 ! 경고</div>
</div>


<div style="position:relative;flex-grow:1;border:2px solid ${v.c.ink};background:${v.c.paper};min-width:0">
<div aria-hidden="true" style="position:absolute;left:4px;top:3px;z-index:3;pointer-events:none;font-size:10px;line-height:12px;color:${v.c.ink};background:${v.c.paper};opacity:0.8;padding:1px 4px"><div>스페이스+좌클릭 : 화면 이동</div><div>배율 ×${v.zoomNow}</div></div>
<div ref=${v.setZoomBox} class="zbox" style="position:absolute;left:0;top:0;right:0;bottom:0;display:flex;overflow:auto;cursor:${v.boxCursor}">
<div style="position:relative;margin:auto;flex-shrink:0;width:${v.dispW}px;height:${v.dispH}px;outline:2px solid ${v.edgeColor};background-color:#d9d9d9;background-image:linear-gradient(45deg,#bdbdbd 25%,transparent 25%,transparent 75%,#bdbdbd 75%),linear-gradient(45deg,#bdbdbd 25%,transparent 25%,transparent 75%,#bdbdbd 75%);background-size:16px 16px;background-position:0 0,8px 8px">
${(v.showUnder) ? html`
<img src=${v.underSrc} alt style="position:absolute;left:0;top:0;width:${v.dispW}px;height:${v.dispH}px;opacity:${v.underOp};filter:${v.imgFilter};pointer-events:none" />
` : null}
<div onPointerDown=${v.pDown} onPointerMove=${v.pMove} onPointerUp=${v.pUp} onPointerCancel=${v.pUp} onLostPointerCapture=${v.pUp} onContextMenu=${v.noMenu} role="application" aria-label="도트 캔버스" style="position:absolute;left:0;top:0;width:${v.dispW}px;height:${v.dispH}px;touch-action:none;cursor:crosshair">
${(v.layerCanvases || []).map((L, $index) => html`
<canvas ref=${L.ref} width=${v.slotW} height=${v.slotH} aria-hidden="true" style="position:absolute;left:0;top:0;width:${v.dispW}px;height:${v.dispH}px;filter:${v.imgFilter};display:${L.display};pointer-events:none"></canvas>
`)}
</div>
${(v.isChibi) ? html`
<div style="position:absolute;left:0;right:0;bottom:${v.chibiGuide}px;border-top:1px dashed #ff2a55;pointer-events:none"></div>
` : null}
</div>
</div>
</div>


<div style="width:200px;flex-shrink:0;display:flex;flex-direction:column;gap:8px;min-height:0">
<div style="border:2px solid ${v.c.ink};background:${v.c.panel};display:flex;flex-direction:column">
<div style="padding:2px 6px;background:${v.c.ink};color:${v.c.panel};font-weight:700">팔레트</div>


<div style="display:flex;justify-content:center;padding:6px 0 4px">
<div onPointerDown=${v.ringDown} onPointerMove=${v.pickMove} onPointerUp=${v.pickUp} role="slider" aria-label="색상(Hue)" aria-valuemin="0" aria-valuemax="360" aria-valuenow=${v.hueNow} style="position:relative;width:120px;height:120px;border-radius:50%;background:conic-gradient(#ff0000,#ffff00,#00ff00,#00ffff,#0000ff,#ff00ff,#ff0000);touch-action:none;cursor:crosshair">
<div style="position:absolute;left:16px;top:16px;width:88px;height:88px;border-radius:50%;background:${v.c.panel};pointer-events:none"></div>
<div onPointerDown=${v.sqDown} onPointerMove=${v.pickMove} onPointerUp=${v.pickUp} role="slider" aria-label="채도·명도" aria-valuenow=${v.svNow} style="position:absolute;left:30px;top:30px;width:60px;height:60px;background:linear-gradient(to top,#000000,rgba(0,0,0,0)),linear-gradient(to right,#ffffff,${v.hueCss});cursor:crosshair;touch-action:none">
<div style="position:absolute;left:${v.sqX}px;top:${v.sqY}px;width:10px;height:10px;margin:-5px 0 0 -5px;border:2px solid #ffffff;outline:1px solid #000000;border-radius:50%;pointer-events:none"></div>
</div>
<div style="position:absolute;left:${v.ringX}px;top:${v.ringY}px;width:12px;height:12px;margin:-6px 0 0 -6px;border:2px solid #000000;outline:1px solid #ffffff;background:${v.hueCss};pointer-events:none"></div>
</div>
</div>


<div style="display:flex;gap:8px;align-items:flex-start;padding:0 8px 8px">
<div class="tip-wrap" style="display:block;position:relative;width:52px;height:60px;flex-shrink:0"><div class="tip l" role="tooltip" style="width:200px"><b>앞색 · 뒷색</b><br />왼쪽 위가 지금 칠하는 앞색입니다. 뒷색을 누르거나 X 키로 서로 바꿉니다. 아래 체크무늬 띠는 투명색입니다. 캔버스에서 우클릭하면 그 점의 색을 집어 옵니다.</div>
<button type="button" onClick=${v.swap} aria-label="뒷색 ${v.bgName} (X로 바꾸기)" style="position:absolute;left:18px;top:18px;width:30px;height:30px;padding:0;cursor:pointer;border:2px solid ${v.c.ink};background:${v.bgCss}"></button>
<button type="button" aria-label="앞색 ${v.colorName}" style="position:absolute;left:0;top:0;width:30px;height:30px;padding:0;border:2px solid ${v.c.ink};outline:2px solid ${v.c.panel};background:${v.fgCss}"></button>
<button type="button" onClick=${v.pickClear} aria-label="투명색(#40FF40) 고르기" style="position:absolute;left:0;top:52px;width:48px;height:8px;padding:0;cursor:pointer;border:1px solid ${v.c.ink};background:repeating-conic-gradient(#9e9e9e 0 25%,#ffffff 0 50%) 0 0 / 8px 8px"></button>
</div>
<div style="flex-grow:1;display:flex;flex-direction:column;gap:2px;font-size:11px;line-height:14px">
<div style="font-weight:700">${v.colorName}</div>
<div style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;background:#e00000"></span>${v.rgb.r}</div>
<div style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;background:#00a000"></span>${v.rgb.g}</div>
<div style="display:flex;align-items:center;gap:4px"><span style="width:8px;height:8px;background:#0000e0"></span>${v.rgb.b}</div>
</div>
</div>


<div style="border-top:2px solid ${v.c.ink};display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:3px;padding:5px 6px">
${(v.swatches || []).map((w, $index) => html`
<div class="tip-wrap" style="display:block"><button type="button" onClick=${w.pick} aria-label=${w.name} style="width:100%;height:20px;padding:0;cursor:pointer;border:${w.border};background:${w.css}"></button><div class="tip t" role="tooltip" style="width:180px"><b>${w.name}</b><br />${w.tip}</div></div>
`)}
</div>
</div>

<div style="border:2px solid ${v.c.ink};background:${v.c.panel}">
<div style="display:flex;align-items:center;padding:2px 3px 2px 6px;background:${v.c.ink};color:${v.c.panel};font-weight:700"><span style="flex:1">레이어 ${v.layerCount}/3</span><button type="button" onClick=${v.addLayer} disabled=${v.noAdd} aria-label="레이어 추가" style="height:18px;padding:0 6px;border:1px solid ${v.c.panel};background:${v.c.ink};color:${v.c.panel};cursor:pointer;font-size:11px;opacity:${v.addOp}">+ 추가</button></div>
<div style="padding:6px;display:flex;flex-direction:column;gap:4px">
${(v.isStatusSlot) ? html`
<div style="display:flex;gap:3px;align-items:center"><div class="tip-wrap" style="flex-shrink:0"><span style="font-weight:700">밑그림 ?</span><div class="tip l" role="tooltip"><b>밑그림</b><br />덧그림 위치를 맞추기 위해 초상화를 흐리게 깔아 둡니다. 화면에만 보이고 내보내는 그림에는 들어가지 않습니다.</div></div><button type="button" onClick=${v.toggleUnder} aria-pressed=${v.underOn} style="height:22px;flex:1;border:2px solid ${v.c.ink};cursor:pointer;padding:0;background:${v.ubOff.bg};color:${v.ubOff.fg}">${v.underLabel}</button><button type="button" onClick=${v.underA} aria-pressed=${v.ubA.on} style="height:22px;flex:1;border:2px solid ${v.c.ink};cursor:pointer;padding:0;background:${v.ubA.bg};color:${v.ubA.fg}">A</button><button type="button" onClick=${v.underB} aria-pressed=${v.ubB.on} style="height:22px;flex:1;border:2px solid ${v.c.ink};cursor:pointer;padding:0;background:${v.ubB.bg};color:${v.ubB.fg}">B</button></div>
<div style="display:flex;gap:6px;align-items:center"><label for="underop" style="flex-shrink:0">불투명도</label><input id="underop" type="range" min="0" max="100" step="5" value=${v.underPct} onInput=${v.onUnderOp} disabled=${v.underDisabled} style="flex:1;min-width:0;accent-color:${v.c.ink}" /><span style="font-weight:700;width:34px;text-align:right">${v.underPct}%</span></div>
<div style="border-top:1px dashed ${v.c.mid}"></div>
` : null}
<div style="display:flex;flex-direction:column;gap:3px">
${(v.layerRows || []).map((L, $index) => html`
<div style="display:flex;gap:2px;height:24px">
<button type="button" onClick=${L.vis} aria-label="${L.name} ${L.eyeLabel}" aria-pressed=${L.visible} style="width:24px;border:1px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};padding:0;cursor:pointer">${L.eye}</button>
<button type="button" onClick=${L.pick} aria-pressed=${L.active} style="flex:1;min-width:0;text-align:left;border:1px solid ${v.c.ink};padding:0 5px;cursor:pointer;overflow:hidden;white-space:nowrap;background:${L.bg};color:${L.fg}">${L.name}</button>
<button type="button" onClick=${L.up} aria-label="${L.name} 위로" style="width:20px;border:1px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};padding:0;cursor:pointer">▲</button>
<button type="button" onClick=${L.down} aria-label="${L.name} 아래로" style="width:20px;border:1px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};padding:0;cursor:pointer">▼</button>
<button type="button" onClick=${L.del} aria-label="${L.name} 삭제" style="width:20px;border:1px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};padding:0;cursor:pointer">x</button>
</div>
`)}
</div>
</div>
</div>
</div>
</div>


${(v.isInfo) ? html`
<div style="flex-grow:1;min-height:0;overflow-y:auto;border:2px solid ${v.c.ink};background:${v.c.panel};padding:12px;display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:10px 16px;align-content:start">
<div style="grid-column:span 2;display:flex;gap:8px;align-items:center;padding-bottom:8px;border-bottom:1px dashed ${v.c.mid}">
<button type="button" onClick=${v.newCharacter} style="height:28px;padding:0 12px;border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer">새 캐릭터</button>
<button type="button" onClick=${v.loadSample} style="height:28px;padding:0 12px;border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer">예시 불러오기 (미미르)</button>
<span style="font-size:11px;color:${v.c.mid}">처음이시라면 예시를 불러와 구조를 살펴보셔도 좋습니다.</span></div>
<label style="display:flex;flex-direction:column;gap:4px">이름 (name)<input value=${v.info.name} onInput=${v.onInfo.name} style="height:28px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:0 6px" /></label>
<label style="display:flex;flex-direction:column;gap:4px">제작자 (author)<input value=${v.info.author} onInput=${v.onInfo.author} style="height:28px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:0 6px" /></label>
<label style="display:flex;flex-direction:column;gap:4px">연락처 (contact)<input value=${v.info.contact} onInput=${v.onInfo.contact} style="height:28px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:0 6px" /></label>
<label class="tip-wrap" style="display:flex;flex-direction:column;gap:4px">직업 꼬리표 (menu_tag) · 엔터로 줄바꿈<div class="tip l" role="tooltip"><b>직업 꼬리표</b><br />캐릭터 선택 화면에서 이름 아래에 나오는 짧은 꼬리표입니다. 기본 캐릭터는 첫 줄에 직업, 둘째 줄에 일본어 표기를 씁니다.</div><textarea value=${v.info.tag} onInput=${v.onInfo.tag} rows="2" style="height:44px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:4px 6px;resize:none"></textarea></label>
<label class="tip-wrap" style="display:flex;flex-direction:column;gap:4px">의상 A 이름 (name_a)<div class="tip" role="tooltip"><b>의상 이름</b><br />집의 옷장에서 의상을 고를 때 보이는 이름입니다. 초상화 A·B와 짝을 이룹니다.</div><input value=${v.info.na} onInput=${v.onInfo.na} style="height:28px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:0 6px" /></label>
<label style="display:flex;flex-direction:column;gap:4px">의상 B 이름 (name_b)<input value=${v.info.nb} onInput=${v.onInfo.nb} style="height:28px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:0 6px" /></label>
<label class="tip-wrap" style="grid-column:span 2;display:flex;flex-direction:column;gap:4px">소개 (menu_desc)<div class="tip b" role="tooltip" style="width:260px"><b>소개 글</b><br />캐릭터 선택 화면의 설명입니다. 기본 캐릭터는 첫 줄에 이름, 둘째 줄에 나이·성별, 한 줄 띄우고 소개를 씁니다. 긴 문장은 게임이 알아서 줄을 넘깁니다.</div> · 엔터로 줄을 바꾸면 내보낼 때 #로 변환됩니다<textarea value=${v.info.desc} onInput=${v.onInfo.desc} style="height:120px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:6px;resize:none"></textarea></label>
<div style="grid-column:span 2;border:2px dashed ${v.c.mid};padding:6px;font-size:11px;line-height:14px;word-break:break-all;display:flex;flex-direction:column;gap:2px"><span style="font-weight:700">.ito에는 다음과 같이 저장됩니다</span><span>${v.tagOut}</span><span>${v.descOut}</span></div>
<div style="grid-column:span 2;font-size:11px">빈 줄은 공백 한 칸(" ")으로 저장됩니다. 본문에 #를 직접 입력하면 게임에서 줄바꿈으로 처리되니 주의해주세요. 능력치는 오른쪽 초상화 패널에서 수정해주세요.</div>

</div>
` : null}


${(v.isPerk) ? html`
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px;flex-shrink:0">
<button type="button" onClick=${v.viewPacks} style="height:28px;border:2px solid ${v.c.ink};cursor:pointer;background:${v.pvA.bg};color:${v.pvA.fg}">퍽팩 고르기 (${v.packCount}/2)</button>
<button type="button" onClick=${v.viewBonus} style="height:28px;border:2px solid ${v.c.ink};cursor:pointer;background:${v.pvB.bg};color:${v.pvB.fg}">시작 보너스 고르기</button>
</div>
` : null}
${(v.isBonus) ? html`
<div style="position:relative;flex-grow:1;min-height:0;display:flex;flex-direction:column;gap:6px;border:2px solid ${v.c.ink};background:${v.c.panel};padding:8px">
${(v.hasConfirm) ? html`
<div class="lock-warn" role="alertdialog" aria-labelledby="lockt">
<div style="display:flex;align-items:center;gap:10px"><svg width="24" height="28" viewBox="0 0 6 7" shape-rendering="crispEdges" aria-hidden="true"><path d="M1 0h4v1H1zM0 1h1v2H0zM5 1h1v2H5zM0 3h6v4H0z" fill=${v.c.panel}></path><rect x="2" y="4" width="2" height="2" fill=${v.c.ink}></rect></svg><span id="lockt" style="font-weight:700;font-size:14px;line-height:18px">잠긴 보너스: ${v.confirmName}</span></div>
<div class="scroll" aria-hidden="true"><span>${v.confirmFlow}</span></div>
<div style="line-height:18px">${v.confirmText}</div>
<div style="display:flex;gap:8px;padding-top:10px">
<button type="button" onClick=${v.confirmYes} style="height:30px;padding:0 14px;border:2px solid ${v.c.panel};background:${v.c.panel};color:${v.c.ink};font-weight:700;cursor:pointer">YES, 사용합니다</button>
<button type="button" onClick=${v.confirmNo} style="height:30px;padding:0 14px;border:2px solid ${v.c.panel};background:${v.c.ink};color:${v.c.panel};cursor:pointer">아니요</button>
</div>
</div>
` : null}
<div style="display:flex;align-items:center;gap:12px;background:${v.c.ink};color:${v.c.panel};padding:8px 10px;flex-shrink:0"><span style="font-weight:700;flex-shrink:0">시작 보너스</span><span>보너스는 최대 2개까지 선택 가능합니다. 없어도 게임에 지장은 없습니다.</span></div>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:6px;flex-shrink:0">
${(v.bonusSlots || []).map((b, $index) => html`
<button type="button" onClick=${b.pick} onMouseEnter=${b.enter} onMouseLeave=${v.hideTip} aria-pressed=${b.on} style="height:34px;display:flex;align-items:center;gap:8px;text-align:left;padding:0 8px;cursor:pointer;border:${b.border};background:${b.bg};color:${b.fg}"><span style="font-weight:700;flex-shrink:0">보너스 ${b.slot}</span><span style="overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${b.label}</span></button>
`)}
</div>
<div style="display:flex;gap:4px;flex-wrap:wrap;flex-shrink:0">
${(v.bonusCats || []).map((k, $index) => html`
<button type="button" onClick=${k.pick} style="height:26px;padding:0 8px;border:2px solid ${v.c.ink};cursor:pointer;background:${k.bg};color:${k.fg}">${k.label}</button>
`)}
<label for="bq" style="position:absolute;left:-9999px">목록 검색</label>
<input id="bq" value=${v.bonusQuery} onInput=${v.onBonusQuery} placeholder="이름 검색 (한글/영어)" style="flex-grow:1;min-width:120px;height:26px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:0 6px" />
</div>
${(v.isNumCat) ? html`
<div style="display:flex;align-items:center;gap:8px;border:2px dashed ${v.c.mid};padding:10px">
<label for="bnum" style="font-weight:700">${v.numLabel}</label>
<input id="bnum" type="number" value=${v.numVal} onInput=${v.onNum} style="width:90px;height:28px;border:2px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};padding:0 6px" />
<button type="button" onClick=${v.applyNum} style="height:28px;padding:0 10px;border:2px solid ${v.c.ink};background:${v.c.ink};color:${v.c.panel};cursor:pointer">보너스 ${v.targetSlot}에 넣기</button>
<span style="font-size:11px;line-height:14px;flex:1">${v.numDesc}</span>
</div>
` : null}
<div style="flex-grow:1;min-height:0;overflow-y:auto;display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:4px;align-content:start">
${(v.bonusItems || []).map((it, $index) => html`
<button type="button" onClick=${it.pick} onMouseEnter=${it.enter} onMouseLeave=${v.hideTip} onFocus=${it.enter} onBlur=${v.hideTip} style="height:40px;display:flex;flex-direction:column;justify-content:center;text-align:left;padding:0 6px;cursor:pointer;border:${it.border};background:${it.bg};color:${it.fg}"><span style="font-weight:700;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis;display:flex;align-items:center;gap:4px">${(it.locked) ? html`<svg width="10" height="12" viewBox="0 0 6 7" shape-rendering="crispEdges" aria-label="잠김" style="flex-shrink:0"><path d="M1 0h4v1H1zM0 1h1v2H0zM5 1h1v2H5zM0 3h6v4H0z" fill=${v.c.panel}></path><rect x="2" y="4" width="2" height="2" fill=${v.c.ink}></rect></svg>` : null}${it.ko}</span><span style="font-size:10px;line-height:12px;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${it.sub}</span></button>
`)}
</div>
<div style="font-size:11px;flex-shrink:0">${v.bonusFoot}</div>
</div>
` : null}
${(v.isPerkPacks) ? html`
<div style="flex-grow:1;min-height:0;overflow-y:auto;border:2px solid ${v.c.ink};background:${v.c.panel};padding:8px;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:6px;align-content:start">
<div style="grid-column:span 3;display:flex;align-items:center;gap:12px;background:${v.c.ink};color:${v.c.panel};padding:8px 10px"><span style="font-weight:700;flex-shrink:0">선택 ${v.packCount}/2</span><span>퍽은 최대 2개까지 선택 가능합니다. 없어도 게임에 지장은 없습니다.</span></div>
${(v.packCards || []).map((p, $index) => html`
<div class="pk-card" style="border:${p.border};padding:6px;height:150px;display:flex;flex-direction:column;gap:4px;background:${p.bg}">
<div style="font-weight:700">${p.ko} <span style="font-weight:400;font-size:11px">${p.tagline}</span></div>
<div style="font-size:11px;line-height:14px">${p.en}</div>
<div class="pk-win" ref=${p.measure} style="height:56px;flex-shrink:0;overflow:hidden"><div class="pk-in" style="--d:-${p.over}px;animation-name:${p.anim};animation-duration:${p.dur}s;animation-timing-function:ease-in-out;animation-iteration-count:infinite;animation-direction:alternate">
<div style="font-size:11px;line-height:14px">· ${p.p1}</div>
<div style="font-size:11px;line-height:14px">· ${p.p2}</div>
</div></div>
<div class="pk-tip" role="tooltip"><div style="font-weight:700;font-size:12px">${p.n1}</div><div>${p.e1}</div><div style="font-weight:700;font-size:12px;padding-top:6px">${p.n2}</div><div>${p.e2}</div></div>
<button type="button" onClick=${p.toggle} aria-pressed=${p.on} style="margin-top:auto;flex-shrink:0;height:24px;border:2px solid ${v.c.ink};cursor:pointer;background:${p.btnBg};color:${p.btnFg}">${p.btnLabel}</button>
</div>
`)}
</div>
` : null}


${(v.isExport) ? html`
<div style="flex-grow:1;min-height:0;display:flex;gap:8px">
<pre style="flex-grow:1;margin:0;overflow:auto;border:2px solid ${v.c.ink};background:${v.c.panel};padding:8px;font-family:Galmuri11,monospace;font-size:11px;line-height:14px;white-space:pre">${v.itoText}</pre>
<div style="width:220px;flex-shrink:0;border:2px solid ${v.c.ink};background:${v.c.panel};padding:8px;display:flex;flex-direction:column;gap:6px">
<div style="font-weight:700">zip 안에 들어갈 것</div>
<div>${v.folder}.ito</div>
<div>${v.folder}/ 그림 ${v.filledCount}장</div>
<div class="tip-wrap"><div style="font-weight:700;padding-top:6px">내보낼 언어 ?</div><div class="tip l" role="tooltip"><b>내보낼 언어</b><br />시작 보너스의 아이템·주문 이름은 플레이어의 게임 언어와 글자까지 같아야 인식됩니다. 퍽팩은 언어와 상관없이 영어 원문으로 저장됩니다.</div></div>
<div style="display:flex;gap:4px"><button type="button" onClick=${v.langKo} aria-pressed=${v.lkO.on} style="flex:1;height:24px;border:2px solid ${v.c.ink};cursor:pointer;background:${v.lkO.bg};color:${v.lkO.fg}">한국어</button><button type="button" onClick=${v.langEn} aria-pressed=${v.lEn.on} style="flex:1;height:24px;border:2px solid ${v.c.ink};cursor:pointer;background:${v.lEn.bg};color:${v.lEn.fg}">English</button></div>
<div style="font-size:11px;line-height:14px">아이템 이름은 플레이하는 게임 언어와 같아야 합니다.</div>
<span style="flex-grow:1"></span>
<div style="display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:4px">
<button type="button" onClick=${v.saveWork} style="height:26px;border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer;font-size:11px">작업 파일 저장</button>
<button type="button" onClick=${v.openWork} style="height:26px;border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer;font-size:11px">작업 파일 열기</button>
</div>
<div style="font-size:10px;line-height:13px;color:${v.c.mid}">작업은 이 브라우저에 자동 저장됩니다. 다른 기기로 옮길 때는 작업 파일을 쓰세요.</div>
<button type="button" onClick=${v.exportZip} style="height:32px;border:2px solid ${v.c.ink};background:${v.c.ink};color:${v.c.panel};cursor:pointer;font-weight:700">zip 내려받기</button>
</div>
</div>
` : null}


<div style="display:${v.navDisplay};grid-template-columns:repeat(2,minmax(0,1fr));gap:8px;height:38px;flex-shrink:0">
<button type="button" onClick=${v.prev} style="border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer">${"<-- "}${v.prevLabel}</button>
<button type="button" onClick=${v.next} style="border:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer">${v.nextLabel}${" -->"}</button>
</div>
</div>
</div>


<div ref=${v.setLogBox} role="log" aria-live="polite" style="height:100px;flex-shrink:0;border-top:2px solid ${v.c.ink};background:${v.c.ink};color:${v.c.panel};padding:4px 10px;overflow-y:auto;display:flex;flex-direction:column;gap:2px">
${(v.logs || []).map((l, $index) => html`
<div style="color:${l.color}">[${l.t}]: ${l.msg}</div>
`)}
</div>
</div>


<div style="width:408px;flex-shrink:0;display:flex;flex-direction:column;background:${v.c.panel};min-width:0">


<div style="border-bottom:2px solid ${v.c.ink};flex-shrink:0">
<div style="height:22px;display:flex;align-items:center;padding:0 8px;background:${v.c.ink};color:${v.c.panel};font-weight:700">${v.infoTitle}</div>
<div style="padding:4px 8px;font-size:11px;line-height:14px;word-break:break-all">${v.infoLine}</div>
<div style="padding:0 8px 4px;font-size:11px;line-height:14px;color:${v.c.mid}">${v.infoNote}</div>
</div>


<div style="border-bottom:2px solid ${v.c.ink};flex-shrink:0">
<div style="display:grid;grid-template-columns:76px minmax(0,1fr);border-bottom:1px solid ${v.c.ink}">
<div class="tip-wrap"><label for="pa" style="width:100%;height:26px;display:flex;align-items:center;padding:0 6px;background:${v.c.ink};color:${v.c.panel};font-weight:700">퍽팩 A</label><div class="tip l" role="tooltip"><b>퍽팩</b><br />캐릭터 고유 퍽 묶음입니다. 팩 하나에 퍽 2개가 들어 있고, 캐릭터는 팩 2개를 가집니다.</div></div>
<select id="pa" value=${v.packAVal} onChange=${v.onPackA} style="height:26px;border:0;background:${v.c.panel};color:${v.c.ink};padding:0 4px">${(v.packOpts || []).map((o, $index) => html`<option value=${o.id}>${o.label}</option>`)}</select>
</div>
<div style="display:grid;grid-template-columns:76px minmax(0,1fr);border-bottom:1px solid ${v.c.ink}">
<div class="tip-wrap"><label for="pb" style="width:100%;height:26px;display:flex;align-items:center;padding:0 6px;background:${v.c.ink};color:${v.c.panel};font-weight:700">퍽팩 B</label><div class="tip l" role="tooltip"><b>퍽팩</b><br />캐릭터 고유 퍽 묶음입니다. 팩 하나에 퍽 2개가 들어 있고, 캐릭터는 팩 2개를 가집니다.</div></div>
<select id="pb" value=${v.packBVal} onChange=${v.onPackB} style="height:26px;border:0;background:${v.c.panel};color:${v.c.ink};padding:0 4px">${(v.packOpts || []).map((o, $index) => html`<option value=${o.id}>${o.label}</option>`)}</select>
</div>
<div style="display:grid;grid-template-columns:76px minmax(0,1fr);border-bottom:1px solid ${v.c.ink}">
<div class="tip-wrap"><label for="ba" style="width:100%;height:26px;display:flex;align-items:center;padding:0 6px;background:${v.c.ink};color:${v.c.panel};font-weight:700">보너스 A</label><div class="tip l" role="tooltip"><b>시작 보너스</b><br />새 게임에서 처음 마을 화면에 도착하면 받습니다. 아이템, 주문, 부상, 저주, 상태, 자금, 파멸, 총알, 담배 중에서 고릅니다.</div></div>
<button type="button" onClick=${v.bonusBtnA.go} onMouseEnter=${v.bonusBtnA.enter} onMouseLeave=${v.hideTip} style="height:26px;border:0;background:${v.c.panel};color:${v.c.ink};text-align:left;padding:0 6px;cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${v.bonusBtnA.label} ▸</button>
</div>
<div style="display:grid;grid-template-columns:76px minmax(0,1fr)">
<div class="tip-wrap"><label for="bb" style="width:100%;height:26px;display:flex;align-items:center;padding:0 6px;background:${v.c.ink};color:${v.c.panel};font-weight:700">보너스 B</label><div class="tip l" role="tooltip"><b>시작 보너스</b><br />새 게임에서 처음 마을 화면에 도착하면 받습니다. 아이템, 주문, 부상, 저주, 상태, 자금, 파멸, 총알, 담배 중에서 고릅니다.</div></div>
<button type="button" onClick=${v.bonusBtnB.go} onMouseEnter=${v.bonusBtnB.enter} onMouseLeave=${v.hideTip} style="height:26px;border:0;background:${v.c.panel};color:${v.c.ink};text-align:left;padding:0 6px;cursor:pointer;overflow:hidden;white-space:nowrap;text-overflow:ellipsis">${v.bonusBtnB.label} ▸</button>
</div>
</div>


<div style="flex-grow:1;min-height:0;overflow-y:auto;padding:4px 8px;font-size:11px;line-height:14px;display:flex;flex-direction:column;gap:2px;border-bottom:2px solid ${v.c.ink}">
<div style="font-weight:700;font-size:12px">퍽 효과</div>
${(v.perkLines || []).map((p, $index) => html`
<div><span style="font-weight:700">${p.name}</span> —${p.eff}</div>
`)}
</div>


<div style="flex-shrink:0;display:flex;flex-direction:column;align-items:center;padding:6px 0 8px;gap:4px;background:${v.c.paper}">
<div style="width:394px;display:flex;align-items:center;gap:4px;font-size:11px">
<div class="tip-wrap" style="flex-grow:1"><span>합계 ${v.statSum} (권장 39)</span><div class="tip l" role="tooltip"><b>능력치 합계</b><br />커뮤니티 모딩 가이드는 여섯 능력치 합을 39 안팎, 운은 6으로 맞추길 권합니다. 해금 캐릭터 중엔 예외도 있습니다.</div></div>
<button type="button" onClick=${v.outfitA} style="height:22px;border:2px solid ${v.c.ink};cursor:pointer;padding:0 6px;background:${v.oa.bg};color:${v.oa.fg}">의상 A</button>
<button type="button" onClick=${v.outfitB} style="height:22px;border:2px solid ${v.c.ink};cursor:pointer;padding:0 6px;background:${v.ob.bg};color:${v.ob.fg}">의상 B</button>
</div>
<div style="position:relative;width:394px;height:332px;border:2px solid ${v.c.ink};background:#000000">
<img src="preview_bg.png" alt style="position:absolute;left:0;top:0;width:390px;height:328px;filter:${v.imgFilter}" />
<img src=${v.previewBase} alt="초상화 미리보기" style="position:absolute;left:0;top:0;width:390px;height:328px;filter:${v.imgFilter}" />
${(v.overlays || []).map((o, $index) => html`
<img src=${o.src} alt style="position:absolute;left:0;top:0;width:390px;height:328px;filter:${v.imgFilter}" />
`)}
<div style="position:absolute;left:0;top:0;display:flex;flex-direction:column;align-items:flex-start">
<div style="display:flex;align-items:center;gap:4px;background:${v.c.panel};color:${v.c.ink};padding:3px 6px 0 4px"><svg width="22" height="20" viewBox="0 0 11 10" shape-rendering="crispEdges" aria-hidden="true"><path d="M1 1h3v1h1v1h1V2h1V1h3v1h1v3h-1v1h-1v1h-1v1H7v1H6v1H5V9H4V8H3V7H2V6H1V5H0V2h1z" fill=${v.c.ink}></path></svg><span style="font-size:24px;line-height:24px;font-weight:700">${v.sta}</span></div>
<div class="tip-wrap"><span style="background:${v.c.panel};color:${v.c.ink};padding:0 6px 2px 4px;font-weight:700">STA</span><div class="tip" role="tooltip"><b>체력 (STA)</b><br />신체적 건강입니다. 0이 되면 캐릭터가 사망합니다. 10 미만이면 '체력 없음' 상태가 됩니다.<br />퍽이나 시작 보너스로 값이 오르거나 줄어든 채 시작할 수 있습니다.</div></div>
</div>
<div style="position:absolute;right:0;top:0;display:flex;flex-direction:column;align-items:flex-end">
<div style="display:flex;align-items:center;gap:4px;background:${v.c.panel};color:${v.c.ink};padding:3px 4px 0 6px"><span style="font-size:24px;line-height:24px;font-weight:700">${v.rea}</span><svg width="22" height="14" viewBox="0 0 11 7" shape-rendering="crispEdges" aria-hidden="true"><path d="M3 0h5v1h2v1h1v3h-1v1H8v1H3V6H1V5H0V2h1V1h2z" fill=${v.c.ink}></path><rect x="3" y="2" width="5" height="3" fill=${v.c.panel}></rect><rect x="5" y="2" width="2" height="3" fill=${v.c.ink}></rect></svg></div>
<div class="tip-wrap"><span style="background:${v.c.panel};color:${v.c.ink};padding:0 4px 2px 6px;font-weight:700">REA</span><div class="tip l" role="tooltip"><b>이성 (REA)</b><br />공포를 견디는 정신력입니다. 0이 되면 정신이 붕괴해 게임이 끝납니다. 10 미만이면 '이성 없음' 상태가 됩니다.<br />퍽이나 시작 보너스로 값이 오르거나 줄어든 채 시작할 수 있습니다.</div></div>
</div>
<div style="position:absolute;left:0;top:68px;display:flex;flex-direction:column;align-items:flex-start;gap:2px">
${(v.leftStats || []).map((s, $index) => html`
<div style="height:20px;display:flex;align-items:center;gap:2px;background:${v.c.panel};color:${v.c.ink};padding:0 3px 0 4px"><div class="tip-wrap"><span style="font-weight:700;width:46px">${s.abbr}:${s.val}</span><div class="tip" role="tooltip"><b>${s.ko}</b><br />${s.tip}</div></div><button type="button" onClick=${s.dec} aria-label="${s.abbr} 낮추기" style="width:16px;height:16px;line-height:12px;border:1px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};cursor:pointer;padding:0">-</button><button type="button" onClick=${s.inc} aria-label="${s.abbr} 올리기" style="width:16px;height:16px;line-height:12px;border:1px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};cursor:pointer;padding:0">+</button></div>
`)}
</div>
<div style="position:absolute;right:0;top:68px;display:flex;flex-direction:column;align-items:flex-end;gap:2px">
${(v.rightStats || []).map((s, $index) => html`
<div style="height:20px;display:flex;align-items:center;gap:2px;background:${v.c.panel};color:${v.c.ink};padding:0 4px 0 3px"><button type="button" onClick=${s.dec} aria-label="${s.abbr} 낮추기" style="width:16px;height:16px;line-height:12px;border:1px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};cursor:pointer;padding:0">-</button><button type="button" onClick=${s.inc} aria-label="${s.abbr} 올리기" style="width:16px;height:16px;line-height:12px;border:1px solid ${v.c.ink};background:${v.c.paper};color:${v.c.ink};cursor:pointer;padding:0">+</button><div class="tip-wrap"><span style="font-weight:700;width:46px;text-align:right">${s.val}:${s.abbr}</span><div class="tip l" role="tooltip"><b>${s.ko}</b><br />${s.tip}</div></div></div>
`)}
<div style="height:20px;display:flex;align-items:center;background:${v.c.panel};color:${v.c.ink};padding:0 4px 0 3px"><div class="tip-wrap"><span style="font-weight:700;width:46px;text-align:right">${v.fnd}:FND</span><div class="tip l" role="tooltip"><b>자금 (FND)</b><br />처음 자금은 게임이 정하고, 캐릭터 파일에서는 시작 보너스 '자금'으로만 늘릴 수 있습니다. 여기는 보너스로 받는 자금만 표시합니다.</div></div></div>
</div>
</div>
<div style="width:394px;display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:2px;border:2px solid ${v.c.ink};padding:2px;background:${v.c.ink}">
${(v.statusToggles || []).map((s, $index) => html`
<div class="tip-wrap" style="display:block"><button type="button" onClick=${s.toggle} aria-pressed=${s.on} style="width:100%;height:34px;cursor:pointer;font-size:11px;line-height:13px;padding:0 2px;white-space:pre-line;border:${s.border};background:${s.bg};color:${s.fg}">${s.label}</button><div class="tip t" role="tooltip"><b>${s.title}</b><br />${s.tip}<br />누르면 미리보기에 겹쳐 봅니다.</div></div>
`)}
</div>
</div>
</div>
</div>
${(v.dragOver) ? html`
<div aria-hidden="true" style="position:absolute;inset:0;z-index:95;pointer-events:none;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center">
<div style="padding:18px 28px;background:${v.c.ink};color:${v.c.panel};border:2px solid ${v.c.panel};outline:2px solid ${v.c.ink};box-shadow:6px 6px 0 ${v.c.mid};font-size:14px;line-height:22px;text-align:center"><b>여기에 놓으면 불러옵니다</b><br /><span style="font-size:11px">폴더 · zip · .ito · 그림(png)</span></div>
</div>
` : null}
${(v.exportAsk) ? html`
<div role="alertdialog" aria-label="내보내기 확인" style="position:absolute;inset:0;z-index:96;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center">
<div style="width:360px;background:${v.c.panel};color:${v.c.ink};border:2px solid ${v.c.ink};box-shadow:6px 6px 0 ${v.c.mid}">
<div style="padding:14px 14px 12px;font-size:13px;line-height:19px">퍽 팩 혹은 보너스가 없습니다. 이대로 내보낼까요?</div>
<div style="display:flex;border-top:2px solid ${v.c.ink}"><button type="button" onClick=${v.askNo} style="flex:1;height:30px;border:0;border-right:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer">취소</button><button type="button" onClick=${v.askYes} style="flex:1;height:30px;border:0;background:${v.c.ink};color:${v.c.panel};cursor:pointer;font-weight:700">내보내기</button></div>
</div>
</div>
` : null}
${(v.itoPick) ? html`
<div role="dialog" aria-label="불러올 캐릭터 고르기" style="position:absolute;inset:0;z-index:96;background:rgba(0,0,0,0.55);display:flex;align-items:center;justify-content:center">
<div style="width:420px;max-height:70vh;display:flex;flex-direction:column;background:${v.c.panel};color:${v.c.ink};border:2px solid ${v.c.ink};box-shadow:6px 6px 0 ${v.c.mid}">
<div style="padding:8px 10px;background:${v.c.ink};color:${v.c.panel};font-weight:700">.ito 파일이 ${v.itoPickCount}개 있습니다. 불러올 캐릭터를 골라주세요.</div>
<div style="flex:1 1 auto;min-height:0;overflow-y:auto;display:flex;flex-direction:column">
${(v.itoPickList || []).map((f, $index) => html`
<button type="button" onClick=${f.go} style="text-align:left;border:0;border-bottom:1px solid ${v.c.mid};background:${v.c.panel};color:${v.c.ink};padding:7px 10px;cursor:pointer">${f.name}</button>
`)}
</div>
<button type="button" onClick=${v.cancelPick} style="height:28px;border:0;border-top:2px solid ${v.c.ink};background:${v.c.panel};color:${v.c.ink};cursor:pointer">취소</button>
</div>
</div>
` : null}
</div>`; }
}

render(html`<${Editor} />`, document.getElementById('app'));
