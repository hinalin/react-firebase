import React from "react";
import "./Assessment.css";
import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import NavigationBar from "../../components/NavigationBar/NavigationBar";
import { useFirebase } from "../../context/FirebaseContext";
import Footer from "../../components/Footer/Footer";

const Assessment = () => {
  const { user } = useFirebase();
  return (
    <>
      <div className="StartAssessment-template">
        <div className="header">
          <NavigationBar/>
        </div>
        <div className="StartAssessmentCard">
          <div className="row">

            <div className="col-4">

              <div style={{ minHeight: "469px" }}>
                <div
                  className="sticky"
                  style={{
                    transform: "translateZ(0px)",
                    top: "90px",
                    width: "450px",
                    position: "fixed",
                  }}
                >
                  <div>
                    <h2 className="StartAssessmentTitle mb-4 mt-5">
                      Mental Health Assessment
                    </h2>
                  </div>

                  <div className="d-flex justify-content-between">
                    <p className="mb-0 StartAssessment-progress-heading">
                      Assessment Progress
                    </p>
                    <p className="mb-0 StartAssessment-progress-percent">0%</p>
                  </div>

                  <div className="StartAssessement-progressbar mt-2 mb-4">
                    <div
                      className="progress-bar"
                      role="progressbar"
                      style={{ width: "100px", height: "10px" }}
                      aria-valuenow="100"
                      aria-valuemin="0"
                      aria-valuemax="100"
                    ></div>
                  </div>

                  <div className="mt-5">

                    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                      <div className="StartAssessment-title">
                        <i className="fas fa-laptop activeIcon me-3"></i>
                        <span>Screening Questions</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="percent">100%</span>
                        <CircularProgressbar
                          value={10}
                          strokeWidth={10} 
                          styles={{
                            root: { width: '30px', height: '20px' },
                            path: { stroke: 'rgb(51, 202, 143)' },
                            text: { fill: 'rgb(51, 202, 143)'},
                            trail: { stroke: '#d6d6d6' },
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                      <div className="StartAssessment-title">
                        <i className="fas fa-comments  me-3"></i>
                        <span>In-Depth Questions</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="percent">0%</span>
                        <CircularProgressbar
                          value={10}
                          strokeWidth={10} 
                          styles={{
                            root: { width: '30px', height: '20px' },
                            path: { stroke: 'rgb(51, 202, 143)' },
                            text: { fill: 'rgb(51, 202, 143)'},
                            trail: { stroke: '#d6d6d6' },
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                      <div className="StartAssessment-title">
                        <i className="fas fa-redo  me-3"></i>
                        <span>Health History</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="percent">0%</span>
                        <CircularProgressbar
                          value={10}
                          strokeWidth={10} 
                          styles={{
                            root: { width: '30px', height: '20px' },
                            path: { stroke: 'rgb(51, 202, 143)' },
                            text: { fill: 'rgb(51, 202, 143)'},
                            trail: { stroke: '#d6d6d6' },
                          }}
                        />
                      </div>
                    </div>

                    <div className="d-flex justify-content-between align-items-center mt-3 flex-wrap">
                      <div className="StartAssessment-title">
                        <i className="fas fa-podcast me-3"></i>
                        <span>Life Functions</span>
                      </div>
                      <div className="d-flex align-items-center">
                        <span className="percent">0%</span>
                        <CircularProgressbar
                          value={10}
                          strokeWidth={10} 
                          styles={{
                            root: { width: '30px', height: '20px' },
                            path: { stroke: 'rgb(51, 202, 143)' },
                            text: { fill: 'rgb(51, 202, 143)'},
                            trail: { stroke: '#d6d6d6' },
                          }}
                        />
                      </div>
                    </div>

                    <div className="StartAssessment-session-timer mt-3">
                      <span style={{fontWeight:"500"}}>Time Left : &nbsp;</span>
                      <div style={{display:"inline-flex"}}>0:0:0</div>
                    </div>
                  </div>

                </div>
              </div>

            </div>
            <div className="col-8">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Unde dignissimos recusandae, sed nobis quibusdam at, dolor nostrum eos quis accusamus doloremque exercitationem, dolorum voluptate. At sequi delectus quia nesciunt vero.
              Ipsam recusandae ex tempore, possimus nihil maxime accusamus sint quas nam, omnis excepturi repellendus eveniet dolores ipsum, optio cupiditate neque unde ab explicabo saepe? Beatae, laborum fugiat? Ipsam, laudantium optio.
              Provident vel fuga velit totam. Fugiat doloribus nisi voluptatibus vero nostrum maxime quam nulla iure quibusdam magnam minus tempore tempora, quas iusto necessitatibus perspiciatis dolorum explicabo optio deleniti eveniet pariatur?
              Laboriosam fugiat omnis ipsam dolorum et quo labore aspernatur tempore ducimus quas soluta, natus doloribus quasi deserunt repellendus culpa rerum consequatur magnam beatae impedit sint, vitae harum. Distinctio, debitis harum.
              Cupiditate natus doloribus laboriosam, vero non tempore voluptatum. Aut placeat eligendi tenetur ullam, alias sapiente dolore esse veritatis rerum. In adipisci voluptatum dignissimos minima dolore voluptas, corporis exercitationem! Sequi, adipisci?
              Sapiente aliquam laboriosam harum debitis eaque expedita, veritatis suscipit tenetur! Ut, tempora ea enim quis quaerat harum quasi sint omnis velit facere. Doloremque molestias asperiores et inventore deleniti ratione modi.
              Reiciendis, officiis, libero vel commodi illo ab enim quam rerum quo dolorum eius. Harum sit voluptatem, necessitatibus enim aspernatur sunt unde assumenda consequuntur tenetur voluptate quasi culpa architecto vero distinctio.
              Placeat impedit numquam reprehenderit doloribus unde ducimus omnis rem inventore ab minima? Doloribus eaque dolor quos odio, similique ipsam modi doloremque veniam delectus iure! Odio consectetur sequi iste provident expedita.
              Reprehenderit saepe, molestias unde magnam eligendi natus reiciendis, nulla porro assumenda dolorem, voluptatibus maiores optio dicta inventore culpa et voluptatem quibusdam doloribus consequuntur error eius doloremque. Rerum exercitationem voluptatem repellat.
              Eligendi tempore dolorum rerum repudiandae inventore possimus doloremque quaerat saepe deserunt quas in numquam nostrum sed voluptatem voluptate vel quibusdam, illum nihil labore! Tempore quibusdam dignissimos animi recusandae officia eius.
              Voluptatibus magni tempore veritatis, laborum obcaecati ipsa esse at aliquid facere quaerat dicta veniam. Magni cumque earum iure molestias unde minima. Ducimus expedita optio minus. Temporibus fugiat reiciendis atque ullam?
              Magnam maxime, cum molestias quasi voluptas recusandae distinctio tenetur nostrum molestiae hic delectus? Culpa ipsa at praesentium aut cum aspernatur repudiandae, ipsum eos, corrupti ipsam porro animi, optio mollitia expedita.
              Debitis assumenda consectetur saepe at omnis minima corporis, ex laboriosam similique ullam, repellendus tempora sequi? Eius temporibus quod nihil adipisci aliquid? Consectetur expedita, similique laudantium quae distinctio magni dignissimos nam.
              A architecto reiciendis expedita tempora enim illo velit qui placeat nemo dolores officiis, dolor recusandae eum facilis, delectus accusamus sit, aliquam sint. Eligendi, quam quisquam veniam iste aut commodi molestias!
              Corrupti, consectetur voluptatum! Aliquid vero in dolores non ut deleniti, saepe impedit autem a architecto. Reprehenderit temporibus minus, explicabo sequi facilis ut, quas ducimus error quo libero harum ipsa consectetur!
              Molestias vel hic facere enim at placeat corrupti excepturi numquam, perferendis neque est quasi reiciendis quidem harum ab, sapiente earum aperiam dicta. Perspiciatis fuga exercitationem possimus aliquid perferendis veritatis eum?
              Exercitationem, consequuntur deleniti? Deserunt itaque vero doloremque nesciunt totam repellendus, necessitatibus eaque tempore sit cupiditate voluptatem rerum numquam, distinctio aspernatur aliquid, nemo provident explicabo debitis harum illo laudantium aperiam. Sunt.
              Eius, porro facere impedit debitis unde dolore doloremque officia eaque error nulla fugit repellat natus beatae rem vero fuga, quo et. Illo saepe accusamus nobis dolore libero inventore corrupti quo?
              Dolores laboriosam est distinctio repellat eaque excepturi qui ducimus esse corporis recusandae incidunt molestiae eum libero deleniti temporibus fugit, iure rerum et officiis doloribus soluta consequatur vitae repudiandae accusamus! Eveniet!
              Optio maiores corrupti ex impedit quae voluptas placeat maxime molestias, et quis, quibusdam fugiat autem facere nemo facilis debitis soluta culpa deserunt consequuntur obcaecati eaque deleniti minus. Voluptas, obcaecati nisi!
              Provident consectetur repellendus, aspernatur dolore aliquid sed perspiciatis vero! Voluptas doloribus itaque corporis animi id ipsa at, consectetur, odit veniam accusantium qui ipsum deserunt recusandae, perferendis doloremque expedita consequuntur laboriosam!
              Cum non maiores officiis vero, sapiente iusto dolorem sit laudantium ipsam asperiores beatae adipisci nam placeat obcaecati incidunt alias consectetur ex saepe! Animi, odio? Tempora recusandae quam ea aliquid error!
              Possimus excepturi voluptas reiciendis suscipit explicabo unde, fugit dicta? Voluptatibus consequatur recusandae tenetur facere saepe rerum nihil laborum totam, aliquam exercitationem praesentium iste dolorem deserunt. Minima rem similique sit architecto.
              Eaque animi porro similique explicabo, a, iure vel quaerat aspernatur sint consectetur ab culpa accusamus sequi harum perspiciatis? Amet cupiditate expedita provident ex optio dignissimos accusantium reprehenderit blanditiis, maiores animi?
              At, culpa! Cumque incidunt, nam itaque, magni neque explicabo modi veritatis molestiae totam consectetur, dignissimos inventore laboriosam ex tempore sed id eligendi. Iste ipsum illum totam soluta vero pariatur eligendi.
              Recusandae illo iure fugit similique culpa voluptatibus delectus optio, dolore provident? Voluptates sint numquam necessitatibus eveniet placeat officiis corrupti consectetur minus aspernatur temporibus accusamus perspiciatis deleniti unde doloremque, repellendus id.
              Consequuntur mollitia doloremque aperiam? Quas magnam omnis repellendus in sapiente id, ullam exercitationem eaque dolore neque atque dicta assumenda accusamus deserunt provident molestiae, sequi dolorum nihil laudantium laboriosam soluta. Accusantium.
              Molestiae nobis vero fugit at maiores sit perferendis earum. Eligendi aspernatur aperiam veritatis autem ut, tempora modi ad quas, harum velit similique nulla totam. Tempore doloribus enim doloremque minima quia?
              Assumenda, unde minus perspiciatis, nulla culpa ducimus suscipit exercitationem libero minima illum quisquam officia rem est accusamus a consectetur modi nam? Dolorum a facilis, explicabo suscipit perferendis laudantium reprehenderit nobis.
              Magnam nostrum maxime recusandae animi, doloremque suscipit blanditiis odio temporibus voluptatibus, inventore odit earum autem, culpa placeat ipsam sed illo deserunt! Et illo maiores reprehenderit consequatur expedita obcaecati odit vitae.
              Eius optio asperiores repudiandae animi suscipit, voluptatem fugit incidunt vitae autem odio nam, vel architecto quaerat doloribus quibusdam libero quam nostrum illo possimus beatae eligendi. Excepturi quas at provident assumenda!
              Provident deleniti delectus atque doloribus porro illo inventore! Enim magni quas, dolor exercitationem sapiente pariatur recusandae culpa dignissimos vitae blanditiis distinctio ducimus ad error nisi sit vel facere porro qui!
              Sapiente porro accusantium incidunt itaque error reiciendis, libero provident quisquam illo numquam earum culpa! Alias assumenda error dolorum impedit dicta? Odit sit facilis id dicta obcaecati suscipit nisi reiciendis animi?
              Consequuntur alias veritatis vero illum perferendis, nemo ipsam quasi quos facere temporibus in sunt? Recusandae, voluptas. Voluptatibus accusantium eveniet, distinctio omnis natus unde alias in dignissimos ea voluptatem fugiat. Molestiae?
              Quam similique, magnam officiis repellendus eligendi eveniet dolore ut! Aperiam consequatur optio adipisci, doloribus deleniti, quibusdam voluptas, illo blanditiis natus voluptatibus veritatis odit dolor cupiditate minima itaque reprehenderit quasi. Laudantium.
              Consectetur numquam labore commodi veritatis ut maxime accusantium impedit eveniet, iste incidunt reprehenderit nam quidem iusto tenetur nobis molestias magnam soluta dolorum omnis similique id, consequatur exercitationem saepe! Eaque, quaerat.
              Deleniti, asperiores expedita placeat quidem impedit minus illo cupiditate tempora aliquid unde fuga enim voluptates! Quos esse voluptatum optio dolorum maxime incidunt nulla similique, laudantium sunt, rem eligendi dolorem vitae?
              Hic voluptate distinctio officia modi necessitatibus, atque fuga quae, aliquam vero, similique culpa a consequuntur odio ea provident animi pariatur. Totam quam, cupiditate eius labore dolorem est autem quasi impedit!
              Recusandae quibusdam officia, aut animi magnam fugiat nam quos dolore voluptatibus id perferendis ipsa consequatur aliquam laborum quidem aspernatur nemo, non provident voluptate! Mollitia consectetur ipsum eveniet harum sunt dignissimos!
              Est totam obcaecati temporibus quis officia libero asperiores perferendis nisi minima aspernatur. Quod impedit quis tempore iusto dolore enim perferendis! Praesentium quas ipsum aperiam odio repellat, dolores incidunt magnam iste.
            </div>
          </div>
        </div>
        <div className="footer">
          <Footer/>
        </div>
      </div>
    </>
  );
};

export default Assessment;
