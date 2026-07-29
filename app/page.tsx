"use client";

import { useMemo, useState } from "react";

type Group = "math" | "env" | "eng" | "data" | "manage" | "expression";
type View = "network" | "timeline" | "ability";

type Course = {
  id: string;
  title: string;
  group: Group;
  year: "大一" | "大二";
  x: number;
  y: number;
  summary: string;
  learned: string[];
  connects: string[];
  next: string;
};

const groups: Array<{ id: Group | "all"; label: string; en: string; color: string }> = [
  { id: "all", label: "全部知识网络", en: "ALL DOMAINS", color: "#c8ff4d" },
  { id: "math", label: "数理基础", en: "FOUNDATIONS", color: "#73a8ff" },
  { id: "env", label: "环境过程", en: "ENVIRONMENT", color: "#4de4c1" },
  { id: "eng", label: "工程系统", en: "ENGINEERING", color: "#ffb45d" },
  { id: "data", label: "数据研究", en: "RESEARCH", color: "#bd91ff" },
  { id: "manage", label: "管理金融", en: "DECISION", color: "#ff7897" },
  { id: "expression", label: "表达与视野", en: "EXPRESSION", color: "#d8ded8" },
];

const courses: Course[] = [
  {
    id: "calculus",
    title: "高等数学",
    group: "math",
    year: "大一",
    x: 22,
    y: 20,
    summary: "用函数、极限、导数与积分描述连续变化，是所有过程模型的共同语言。",
    learned: ["变化率", "累积量", "多变量关系"],
    connects: ["物理化学", "水力学", "环境统计学"],
    next: "补强微分方程与数值计算，把公式变成可运行的过程模型。",
  },
  {
    id: "physics",
    title: "大学物理",
    group: "math",
    year: "大一",
    x: 47,
    y: 10,
    summary: "从力、能量、电磁与波动建立物理直觉，为流体、电路和传感器奠基。",
    learned: ["守恒", "受力分析", "场与能量"],
    connects: ["水力学", "电工电子", "物理化学"],
    next: "用传感器实验重新理解误差、信号与能量转换。",
  },
  {
    id: "chemistry",
    title: "基础化学",
    group: "math",
    year: "大一",
    x: 72,
    y: 18,
    summary: "理解物质结构、化学平衡和反应规律，进入环境化学与污染控制的入口。",
    learned: ["结构—性质", "反应平衡", "酸碱与氧化还原"],
    connects: ["物理化学", "环境化学"],
    next: "把反应式推进到热力学、动力学和环境介质中的真实行为。",
  },
  {
    id: "physical-chemistry",
    title: "物理化学",
    group: "math",
    year: "大二",
    x: 25,
    y: 44,
    summary: "用热力学、相平衡与动力学解释环境过程为何发生、能进行到哪里、进行得多快。",
    learned: ["热力学", "化学势与平衡", "反应动力学"],
    connects: ["环境化学", "水力学", "环境统计学"],
    next: "深入界面化学、吸附动力学与环境反应器模型。",
  },
  {
    id: "hydraulics",
    title: "水力学",
    group: "env",
    year: "大二",
    x: 50,
    y: 35,
    summary: "以质量、动量与能量守恒描述流体输运，连接自然水体、管网和处理单元。",
    learned: ["连续方程", "能量方程", "阻力与流态"],
    connects: ["高等数学", "大学物理", "工程制图", "环境化学"],
    next: "继续学习流体力学、污染物输运与 CFD 数值模拟。",
  },
  {
    id: "environmental-chemistry",
    title: "环境化学",
    group: "env",
    year: "大二",
    x: 76,
    y: 43,
    summary: "追踪污染物在水、土、气中的形态、迁移、转化与生态效应。",
    learned: ["介质分配", "迁移转化", "污染物生命周期"],
    connects: ["基础化学", "物理化学", "海洋环境保护", "环境统计学"],
    next: "选择一种新污染物，建立“来源—归趋—暴露—风险”完整链条。",
  },
  {
    id: "ocean",
    title: "海洋环境保护",
    group: "env",
    year: "大二",
    x: 87,
    y: 64,
    summary: "把化学过程、生态系统与治理政策放进海洋这一复杂开放系统。",
    learned: ["海洋生态", "污染防治", "综合治理"],
    connects: ["环境化学", "环境统计学", "管理学"],
    next: "关注近岸生态修复、海洋微塑料或蓝碳监测。",
  },
  {
    id: "electrical",
    title: "电工电子",
    group: "eng",
    year: "大二",
    x: 72,
    y: 82,
    summary: "建立电路、信号与控制的系统直觉，是环境监测和自动化的硬件基础。",
    learned: ["电路分析", "模拟与数字信号", "传感控制"],
    connects: ["大学物理", "环境统计学", "工程制图"],
    next: "用 Arduino/ESP32 做一个水质或空气质量采集原型。",
  },
  {
    id: "drawing",
    title: "工程制图",
    group: "eng",
    year: "大二",
    x: 48,
    y: 88,
    summary: "把空间结构、尺寸约束与工程意图准确表达出来，让方案可沟通、可制造。",
    learned: ["投影与视图", "尺寸规范", "CAD 表达"],
    connects: ["水力学", "电工电子", "金工实习"],
    next: "从二维制图进入三维建模和环境处理设施布置。",
  },
  {
    id: "metalwork",
    title: "金工实习",
    group: "eng",
    year: "大二",
    x: 26,
    y: 82,
    summary: "把图纸、材料与加工工艺连接起来，形成对工程可制造性的真实感。",
    learned: ["工艺意识", "安全规范", "动手验证"],
    connects: ["工程制图", "管理学"],
    next: "在项目中承担结构打样，让设计经历一次真实制造闭环。",
  },
  {
    id: "statistics",
    title: "环境统计学",
    group: "data",
    year: "大二",
    x: 13,
    y: 62,
    summary: "把环境观测变成可信证据，从描述、检验到回归与多变量分析。",
    learned: ["假设检验", "回归分析", "主成分分析"],
    connects: ["高等数学", "环境化学", "科技文献检索", "电工电子"],
    next: "从 SPSS 迁移到 Python/R，学习可重复分析与数据可视化。",
  },
  {
    id: "literature",
    title: "科技文献检索",
    group: "data",
    year: "大二",
    x: 8,
    y: 40,
    summary: "从问题定义、检索式、证据筛选到论文写作，建立研究工作的入口流程。",
    learned: ["检索策略", "文献评价", "引用与论文写作"],
    connects: ["环境统计学", "英语", "马克思主义"],
    next: "围绕一个环境问题完成系统性文献地图和可验证研究假设。",
  },
  {
    id: "management",
    title: "管理学",
    group: "manage",
    year: "大二",
    x: 10,
    y: 21,
    summary: "理解组织、协作、激励与决策，使技术方案能够进入真实团队并持续运行。",
    learned: ["组织设计", "计划与控制", "团队决策"],
    connects: ["公司金融", "海洋环境保护", "金工实习"],
    next: "学习项目管理与环境政策，把技术方案转化为可执行行动。",
  },
  {
    id: "corporate-finance",
    title: "公司金融",
    group: "manage",
    year: "大二",
    x: 7,
    y: 7,
    summary: "用现金流、资本成本与风险评价长期项目，连接工程效果与经济可行性。",
    learned: ["现金流折现", "资本成本", "项目估值"],
    connects: ["证券投资分析", "管理学"],
    next: "学习环境项目全生命周期成本、碳资产与绿色金融。",
  },
  {
    id: "investment",
    title: "证券投资分析",
    group: "manage",
    year: "大二",
    x: 91,
    y: 12,
    summary: "在不确定信息中比较收益与风险，理解资产定价、公司价值和市场行为。",
    learned: ["风险—收益", "公司分析", "资产组合"],
    connects: ["公司金融", "环境统计学"],
    next: "探索 ESG 数据、气候风险与绿色产业投资研究。",
  },
  {
    id: "ideology",
    title: "思政与社会观察",
    group: "expression",
    year: "大二",
    x: 93,
    y: 36,
    summary: "用社会结构、劳动价值与历史视角理解技术背后的人、制度与公共选择。",
    learned: ["问题意识", "社会调查", "论证写作"],
    connects: ["管理学", "科技文献检索", "英语"],
    next: "把环境公平、平台劳动或技术伦理转化为跨学科研究问题。",
  },
  {
    id: "english",
    title: "英语",
    group: "expression",
    year: "大一",
    x: 91,
    y: 88,
    summary: "打开国际论文、全球案例与跨文化表达，是知识网络持续向外生长的接口。",
    learned: ["学术阅读", "听力输入", "写作表达"],
    connects: ["科技文献检索", "环境化学", "证券投资分析"],
    next: "从六级能力升级到“读论文—做笔记—口头讲解”的学术英语闭环。",
  },
];

const connectionPairs = [
  ["calculus", "physical-chemistry"],
  ["calculus", "hydraulics"],
  ["calculus", "statistics"],
  ["physics", "hydraulics"],
  ["physics", "electrical"],
  ["chemistry", "physical-chemistry"],
  ["chemistry", "environmental-chemistry"],
  ["physical-chemistry", "environmental-chemistry"],
  ["physical-chemistry", "hydraulics"],
  ["hydraulics", "drawing"],
  ["hydraulics", "environmental-chemistry"],
  ["environmental-chemistry", "statistics"],
  ["environmental-chemistry", "ocean"],
  ["ocean", "management"],
  ["statistics", "literature"],
  ["statistics", "electrical"],
  ["statistics", "investment"],
  ["drawing", "electrical"],
  ["drawing", "metalwork"],
  ["management", "corporate-finance"],
  ["corporate-finance", "investment"],
  ["literature", "english"],
  ["literature", "ideology"],
  ["management", "ideology"],
] as const;

const futureRoutes = [
  {
    no: "01",
    title: "环境过程建模",
    copy: "物理化学 × 水力学 × 环境化学",
    result: "能解释污染物如何迁移、转化，并用模型预测。",
  },
  {
    no: "02",
    title: "智能环境监测",
    copy: "电工电子 × 环境统计 × Python",
    result: "完成传感器采集、数据清洗、异常识别与可视化。",
  },
  {
    no: "03",
    title: "研究与升学能力",
    copy: "文献检索 × 学术英语 × 可重复分析",
    result: "从文献缺口提出假设，形成可展示的研究作品。",
  },
  {
    no: "04",
    title: "技术决策与绿色金融",
    copy: "工程效果 × 公司金融 × 管理学",
    result: "同时回答“技术有效吗、经济可行吗、组织能落地吗”。",
  },
];

const groupColor = (group: Group) => groups.find((item) => item.id === group)?.color ?? "#c8ff4d";

function NetworkView({
  filter,
  selected,
  onSelect,
  scale,
}: {
  filter: Group | "all";
  selected: Course;
  onSelect: (course: Course) => void;
  scale: number;
}) {
  const byId = useMemo(() => new Map(courses.map((course) => [course.id, course])), []);
  const activeConnections = new Set(
    connectionPairs
      .filter(([from, to]) => from === selected.id || to === selected.id)
      .flatMap(([from, to]) => [from, to]),
  );

  return (
    <div className="network-stage">
      <div className="orbit orbit-one" />
      <div className="orbit orbit-two" />
      <div className="orbit orbit-three" />
      <div className="core-pulse" />
      <div className="network-canvas" style={{ transform: `translate(-50%, -50%) scale(${scale})` }}>
        {connectionPairs.map(([fromId, toId]) => {
          const from = byId.get(fromId);
          const to = byId.get(toId);
          if (!from || !to) return null;
          const dx = to.x - from.x;
          const dy = to.y - from.y;
          const length = Number(Math.sqrt(dx * dx + dy * dy).toFixed(3));
          const angle = Number((Math.atan2(dy, dx) * (180 / Math.PI)).toFixed(3));
          const isActive = fromId === selected.id || toId === selected.id;
          const isFiltered = filter === "all" || from.group === filter || to.group === filter;
          return (
            <span
              className={`network-edge ${isActive ? "edge-active" : ""} ${!isFiltered ? "edge-dim" : ""}`}
              key={`${fromId}-${toId}`}
              style={{
                left: `${from.x}%`,
                top: `${from.y}%`,
                width: `${length}%`,
                transform: `rotate(${angle}deg)`,
              }}
            />
          );
        })}

        <button
          className="core-node"
          onClick={() => onSelect(selected)}
          aria-label="知识网络核心：环境系统问题解决"
        >
          <span>CORE 2024—26</span>
          环境 · 系统
          <br />
          问题解决
          <small>理解 → 设计 → 验证 → 决策</small>
        </button>

        {courses.map((course) => {
          const visible = filter === "all" || filter === course.group;
          const related = activeConnections.has(course.id);
          return (
            <button
              key={course.id}
              className={`course-node ${selected.id === course.id ? "node-selected" : ""} ${
                !visible ? "node-dim" : ""
              } ${related ? "node-related" : ""}`}
              style={
                {
                  left: `${course.x}%`,
                  top: `${course.y}%`,
                  "--node-color": groupColor(course.group),
                } as React.CSSProperties
              }
              onClick={() => onSelect(course)}
              aria-pressed={selected.id === course.id}
            >
              <i />
              {course.title}
              <em>{course.year}</em>
            </button>
          );
        })}
      </div>
    </div>
  );
}

function TimelineView({ onSelect }: { onSelect: (course: Course) => void }) {
  return (
    <div className="timeline-view">
      <div className="time-column">
        <div className="time-marker">2024</div>
        <div>
          <p className="view-kicker">大一 · 基础扎根</p>
          <h3>先学会描述世界</h3>
          <p>数学提供变化语言，物理提供守恒直觉，化学提供物质视角，英语打开外部知识。</p>
          <div className="time-courses">
            {courses
              .filter((course) => course.year === "大一")
              .map((course) => (
                <button key={course.id} onClick={() => onSelect(course)}>
                  {course.title}
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="time-column">
        <div className="time-marker active">2025—26</div>
        <div>
          <p className="view-kicker">大二 · 专业成网</p>
          <h3>开始解释、设计和判断</h3>
          <p>过程课程解释环境，工程课程改变系统，统计与检索让判断有证据，管理金融让方案能落地。</p>
          <div className="time-courses">
            {courses
              .filter((course) => course.year === "大二")
              .map((course) => (
                <button key={course.id} onClick={() => onSelect(course)}>
                  {course.title}
                </button>
              ))}
          </div>
        </div>
      </div>
      <div className="time-column future-column">
        <div className="time-marker">NEXT</div>
        <div>
          <p className="view-kicker">大三起 · 形成主线</p>
          <h3>从课程输入走向研究输出</h3>
          <p>选择一个真实环境问题，用模型、数据、硬件和决策框架做出可展示的完整项目。</p>
          <div className="future-mini">建议主项目：校园水环境智能监测与风险评估</div>
        </div>
      </div>
    </div>
  );
}

function AbilityView() {
  const abilities = [
    { title: "解释过程", level: 78, source: "物理化学 · 水力学 · 环境化学" },
    { title: "分析证据", level: 72, source: "环境统计学 · 科技文献检索" },
    { title: "设计系统", level: 60, source: "电工电子 · 工程制图 · 金工实习" },
    { title: "判断价值", level: 67, source: "管理学 · 公司金融 · 证券分析" },
    { title: "表达观点", level: 70, source: "英语 · 课程论文 · 汇报协作" },
  ];
  return (
    <div className="ability-view">
      <div className="ability-copy">
        <p className="view-kicker">能力树 / CAPABILITY TREE</p>
        <h3>你真正带走的，不是课程名</h3>
        <p>两年学习已经形成五种可迁移能力。下一阶段要做的，是让它们在同一个项目中协同工作。</p>
        <div className="ability-core">环境系统问题解决者</div>
      </div>
      <div className="ability-list">
        {abilities.map((ability) => (
          <div className="ability-row" key={ability.title}>
            <div className="ability-head">
              <strong>{ability.title}</strong>
              <span>{ability.level}% · 当前基础</span>
            </div>
            <div className="ability-track">
              <i style={{ width: `${ability.level}%` }} />
            </div>
            <p>{ability.source}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default function Home() {
  const [filter, setFilter] = useState<Group | "all">("all");
  const [selected, setSelected] = useState<Course>(courses[4]);
  const [scale, setScale] = useState(1);
  const [view, setView] = useState<View>("network");
  const countFor = (group: Group | "all") => (group === "all" ? courses.length : courses.filter((c) => c.group === group).length);

  const selectCourse = (course: Course) => {
    setSelected(course);
    setFilter(course.group);
  };

  return (
    <main className="atlas-shell">
      <header className="topbar">
        <div className="brand-lockup">
          <div className="monogram" aria-hidden="true">
            WQ
          </div>
          <div>
            <p className="eyebrow">WANG QIER · LEARNING ATLAS 2024—2026</p>
            <h1>我的学习，正在长成一张网</h1>
          </div>
        </div>
        <div className="header-stats">
          <div>
            <strong>{courses.length}</strong>
            <span>课程节点</span>
          </div>
          <div>
            <strong>6</strong>
            <span>知识域</span>
          </div>
          <div className="growth-status">
            <i />
            持续生长中
          </div>
        </div>
      </header>

      <div className="atlas-grid">
        <aside className="left-panel">
          <p className="panel-label">知识域 / DOMAINS</p>
          <nav className="domain-nav" aria-label="按知识领域筛选">
            {groups.map((group) => (
              <button
                key={group.id}
                className={filter === group.id ? "active" : ""}
                style={{ "--domain-color": group.color } as React.CSSProperties}
                onClick={() => {
                  setFilter(group.id);
                  setView("network");
                }}
              >
                <i />
                <span>
                  {group.label}
                  <small>{group.en}</small>
                </span>
                <b>{String(countFor(group.id)).padStart(2, "0")}</b>
              </button>
            ))}
          </nav>
          <div className="legend-block">
            <p className="panel-label">连接说明</p>
            <span>
              <i className="solid-line" /> 概念与规律迁移
            </span>
            <span>
              <i className="dash-line" /> 方法与工具复用
            </span>
          </div>
          <div className="reflection-card">
            <span>两年后的关键发现</span>
            <p>你的课程并不分散：它们都在训练你如何理解复杂系统，并让判断更可靠。</p>
          </div>
        </aside>

        <section className="workspace">
          <div className="workspace-head">
            <div>
              <p className="panel-label">
                {view === "network" ? "KNOWLEDGE NETWORK / 全景视图" : view === "timeline" ? "LEARNING JOURNEY / 学习历程" : "CAPABILITY TREE / 能力结构"}
              </p>
              <p>
                {view === "network"
                  ? "点击课程，查看它从哪里来、与什么相连、又能通向哪里"
                  : view === "timeline"
                    ? "从基础扎根、专业成网，到下一阶段形成自己的研究主线"
                    : "把课程还原成可迁移、可组合、可继续生长的能力"}
              </p>
            </div>
            {view === "network" && (
              <div className="zoom-controls" aria-label="地图缩放">
                <button onClick={() => setScale((value) => Math.max(0.76, value - 0.1))} aria-label="缩小地图">
                  −
                </button>
                <button onClick={() => setScale(1)} aria-label="重置地图">
                  •
                </button>
                <button onClick={() => setScale((value) => Math.min(1.18, value + 0.1))} aria-label="放大地图">
                  ＋
                </button>
              </div>
            )}
          </div>

          <div className="view-area">
            {view === "network" && (
              <NetworkView filter={filter} selected={selected} onSelect={setSelected} scale={scale} />
            )}
            {view === "timeline" && <TimelineView onSelect={selectCourse} />}
            {view === "ability" && <AbilityView />}
          </div>

          <div className="view-tabs" role="tablist" aria-label="切换知识地图视图">
            {[
              ["network", "关系网络"],
              ["timeline", "学期时间线"],
              ["ability", "能力树"],
            ].map(([id, label]) => (
              <button
                key={id}
                role="tab"
                aria-selected={view === id}
                className={view === id ? "active" : ""}
                onClick={() => setView(id as View)}
              >
                {label}
              </button>
            ))}
          </div>
        </section>

        <aside className="right-panel">
          <p className="panel-label">当前节点 / FOCUS</p>
          <article className="focus-card" style={{ "--focus-color": groupColor(selected.group) } as React.CSSProperties}>
            <div className="focus-meta">
              <span>{selected.year}</span>
              <b>{groups.find((group) => group.id === selected.group)?.label}</b>
            </div>
            <h2>{selected.title}</h2>
            <p>{selected.summary}</p>
            <h3>我学会了</h3>
            <div className="skill-chips">
              {selected.learned.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <h3>它连接着</h3>
            <div className="connection-list">
              {selected.connects.map((item) => (
                <span key={item}>↗ {item}</span>
              ))}
            </div>
            <div className="next-step">
              <span>继续深入</span>
              <p>{selected.next}</p>
            </div>
          </article>

          <section className="route-panel">
            <div className="route-heading">
              <p className="panel-label">未来生长路径</p>
              <span>大三 → 毕业</span>
            </div>
            {futureRoutes.map((route) => (
              <article key={route.no}>
                <b>{route.no}</b>
                <div>
                  <h3>{route.title}</h3>
                  <p>{route.copy}</p>
                  <small>{route.result}</small>
                </div>
              </article>
            ))}
          </section>
        </aside>
      </div>

      <footer className="atlas-footer">
        <div className="journey-rail">
          <span>大一 · 基础</span>
          <div>
            <i className="point p1" />
            <i className="point p2" />
            <i className="point p3 active" />
            <i className="point p4" />
          </div>
          <span>未来 · 研究</span>
        </div>
        <p>
          <i /> 你在这里：大二结束，知识开始从“课程集合”变成“问题解决框架”
        </p>
      </footer>
    </main>
  );
}
