import React, { Component } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import AppStateContext from '../../../utils/AppStateContext';

export default class Example extends Component {

    static contextType = AppStateContext
    constructor(props) {
        super(props);
        this.state = {
            open: true,
            error: []
        };
    }

    popClose = () => {
        const { setValidationPop } = this.context
        setValidationPop(false)
    }

    componentDidMount() {
        if (this.props.err) {
            const falseValuesArray = Object.entries(this.props.err)
                .filter(([key, value]) => !value)
                .map(([key]) => {
                    const normalizedKey = key.replace(/_check$/, ''); // Remove "_check" if it exists at the end
                    return normalizedKey.split('_').map(word => word.charAt(0) + word.slice(1)).join(' ');
                });

            this.setState({ error: falseValuesArray });
        }
    }

    render() {

        return (
            <Transition.Root show={this.context.validationPop}>
                <Dialog as="div" className="relative z-10" onClose={this.popClose}>
                    <Transition.Child
                        as={React.Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
                        <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                as={React.Fragment}
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            >
                                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                                    <div>
                                        <div>
                                            <Dialog.Title as="h3" className="text-base text-center font-semibold leading-6 text-gray-900">
                                                Error
                                            </Dialog.Title>
                                            <div className="mt-2">
                                                <p className="text-sm text-gray-500">
                                                    Please fill all the fields of below,
                                                </p>
                                                {
                                                    this.state.error.map((data, index) => (
                                                        <div className='mt-2 ml-2' key={index}>
                                                            <p className='text-sm text-gray-500 capitalize'>{index + 1 + '. '}{data}</p>
                                                        </div>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </div>
                                    <div className="mt-5 sm:mt-6">
                                        <button
                                            type="button"
                                            className="inline-flex w-full justify-center rounded-md bg-red-400 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                                            onClick={this.popClose}
                                        >
                                            Close
                                        </button>
                                    </div>
                                </Dialog.Panel>
                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    }
}



// let blog_data = [
//     {
//         "type": "section",
//         "id": "1709378983006_06sembeqo3",
//         "data": [
//             {
//                 "title": "heading",
//                 "content": "What is an on-premises PBX system?",
//                 "titleTag": "h2",
//                 "id": "1709378983006_4riu2l9ath"
//             },
//             {
//                 "title": "description",
//                 "content": "An <b>On-Premises PBX System</b>, or Private Branch Exchange, is a traditional business phone system that operates within a company's physical location. The entire phone system, including hardware and infrastructure, is hosted on-site. Modern telephony solutions like Cloud PBX use Cloud-Based Technology and off-site servers.",
//                 "id": "1709378983006_mgvjpgbzrx"
//             },
//             {
//                 "title": "description",
//                 "content": "This gives businesses direct control over their telephony operations. However, this model comes with considerations like higher upfront costs, ongoing maintenance responsibilities, and limited scalability compared to cloud-based solutions.",
//                 "id": "1709379001883_tjr0752f9y"
//             },
//             {
//                 "title": "image",
//                 "alt": "What is an on-premises PBX system?",
//                 "id": "1709379010557_ba9ho4wntv"
//             }
//         ]
//     },
//     {
//         "type": "section",
//         "id": "1709379028727_t0of3g1aeo",
//         "data": [
//             {
//                 "title": "heading",
//                 "content": "What is a cloud PBX phone system?",
//                 "titleTag": "h2",
//                 "id": "1709379028727_12ndtclro5"
//             },
//             {
//                 "title": "description",
//                 "content": "A Cloud PBX Phone System, also known as Cloud-Hosted PBX, is a modern and flexible business phone solution that operates in the cloud instead of on location. Unlike traditional On-Premises PBX systems, Cloud PBX uses servers managed by a service provider in an off-site location. This shift to the cloud offers several benefits, such as enhanced scalability, reduced maintenance burdens, and often more cost-effective solutions.",
//                 "id": "1709379028727_j05n42ch7"
//             },
//             {
//                 "title": "table",
//                 "content": [
//                     "Call forwarding",
//                     "Call whisparing",
//                     "Unconditional forwarding ",
//                     "Cold transfer",
//                     "Conditional Forwarding 3",
//                     "Warm transfer ",
//                     "Busy forwarding",
//                     "Live call transfer 3",
//                     "No answer forwarding ",
//                     "Automatic call transfer",
//                     "Selective forwarding 3",
//                     "Live call transfer ",
//                     "Cold transfer",
//                     "Conditional Forwarding Conditional Forwarding scheduleschedule schedule this.props.previewData this.props.previewData ",
//                 ],
//                 "colm": "2",
//                 "id": "1709379048921_q8zeydr208"
//             }
//         ]
//     },
//     {
//         "type": "section",
//         "id": "1709379168279_pao4nwd5oo",
//         "data": [
//             {
//                 "title": "heading",
//                 "content": "Key features:",
//                 "titleTag": "h3",
//                 "id": "1709379168279_duti80zoc6"
//             },
//             {
//                 "title": "description",
//                 "content": "-. *Scalability:* Businesses can easily adjust their phone system up or down based on their facing changing needs.",
//                 "id": "1709379168279_jy209wc8zw"
//             },
//             {
//                 "title": "description",
//                 "content": "-. *Cost-Efficiency:* As businesses do not need to invest in on-site hardware, which can significantly reduce both upfront costs and maintenance expenses.",
//                 "id": "1709379189465_3pmpbn04rx"
//             },
//             {
//                 "title": "description",
//                 "content": "-. *Advanced features:* Cloud PBX often comes with Advanced Features such as voicemail-to-email, call forwarding, and auto-attendants to enhance the overall user experience.",
//                 "id": "1709379198181_1w2c7ol9m9"
//             }
//         ]
//     },
//     {
//         "type": "recommended_reading",
//         "id": "1709379212872_sf1fdmv6dg",
//         "data": [
//             {
//                 "description": "How cloud call center technology revolutionizes customer service?",
//                 "link": "https://www.telecmi.com",
//                 "id": "1709379212872_efb90qedh1"
//             },
//             {
//                 "description": "It’s time to shift from on-premises to cloud PBX phone system",
//                 "link": "https://www.telecmi.com",
//                 "id": "1709379224768_2mans7w2v0"
//             }
//         ]
//     },
//     {
//         "type": "section",
//         "id": "1709379264252_6admutpsbm",
//         "data": [
//             {
//                 "title": "heading",
//                 "content": "The advantages of cloud PBX solutions",
//                 "titleTag": "h2",
//                 "id": "1709379286163_0hqyuojm1et"
//             },
//             {
//                 "title": "description",
//                 "content": "In today's rapidly evolving business communication landscape, Cloud PBX Solutions emerge as a game-changer, offering a wide range of the benefits that redefine the way organizations communicate and collaborate.",
//                 "id": "1709379264252_a5v7lfdhyn"
//             },
//             {
//                 "title": "heading",
//                 "content": "1. Achieving flexibility without being bound by locations",
//                 "titleTag": "h3",
//                 "id": "1709379286163_0hqyuojm1et"
//             },
//             {
//                 "title": "description",
//                 "content": "Cloud PBX is the ultimate solution for businesses looking to break free from the limitations of physical locations. Unlike on-premises systems, Cloud PBX enables users to connect and communicate effortlessly from anywhere with an internet connection. It provides super flexibility and empowering remote work capabilities. With Cloud PBX, communication is not bound by the walls of an office, and businesses can unleash their full potential regardless of their location.",
//                 "id": "1709379264252_fylepup18z"
//             },
//             {
//                 "title": "heading",
//                 "content": "2. Analyzing the costs of maintenance compared with on-premises solutions",
//                 "titleTag": "h3",
//                 "id": "1709379286163_0hq7yjm1et"
//             },
//             {
//                 "title": "description",
//                 "content": "Cloud PBX is the ultimate solution for businesses looking to break free from the limitations of physical locations. Unlike on-premises systems, Cloud PBX enables users to connect and communicate effortlessly from anywhere with an internet connection. It provides super flexibility and empowering remote work capabilities. With Cloud PBX, communication is not bound by the walls of an office, and businesses can unleash their full potential regardless of their location.",
//                 "id": "1709379302540_hnc6pcykl1"
//             }
//         ]
//     },
//     {
//         "type": "cta",
//         "data": [],
//         "id": "1709379317051_f9calovti7"
//     },
//     {
//         "type": "section",
//         "id": "1709379324056_e4a324yrzx",
//         "data": [
//             {
//                 "title": "heading",
//                 "content": "Identifying hardware failure warning signs",
//                 "titleTag": "h2",
//                 "id": "1709379324056_un1bi4a2bi"
//             },
//             {
//                 "title": "description",
//                 "content": "Maintaining a healthy hardware infrastructure is absolutely critical for seamless business operations. Recognizing warning signs of hardware failure is crucial in maintaining an efficient communication system, whether traditional or considering a shift to advanced solutions like Cloud PBX.",
//                 "id": "1709379324056_n78vx9fi32"
//             },
//             {
//                 "title": "image",
//                 "alt": "What is an on-premises PBX system?",
//                 "id": "1709379010557_ba9ho4wntv"
//             },
//             {
//                 "title": "heading",
//                 "content": "Key features:",
//                 "titleTag": "h3",
//                 "id": "1709379380116_6mpb4z6zxt"
//             },
//             {
//                 "title": "description",
//                 "content": "-. *Frequent disruptions:* Noticeable interruptions in phone service, such as dropped calls or static on the line, may indicate underlying hardware issues. Regular disruptions can impact communication reliability, affecting business interactions.",
//                 "id": "1709379393623_6sxd4jb15g"
//             },
//             {
//                 "title": "description",
//                 "content": "-. *Unusual noises:* Unusual noises coming from phone equipment, like buzzing, crackling, or humming, may indicate upcoming hardware failure. These sounds can serve as early warnings that require immediate attention to prevent more significant problems.",
//                 "id": "1709379394109_04xcmj4prq"
//             }
//         ]
//     },
//     {
//         "type": "testimonials",
//         "id": "1709379409802_797ptrjto7",
//         "data": [
//             {
//                 "description": "Lorem ipsum dolor sit amet, consectetur eliton tadipiscing elit. Nunc vulputate aliquet odio adrm dolor sit amet mattis. ad litora fnit aliquet vulputate aptent.”",
//                 "name": "John Ashutosh",
//                 "role": "Customer Relations Manager",
//                 "id": "1709379409802_nvn0a2j80z"
//             }
//         ]
//     },
//     {
//         "type": "section",
//         "id": "1709379462796_f9j6uzsmnn",
//         "data": [
//             {
//                 "title": "heading",
//                 "content": "Why TeleCMI stands out In cloud PBX systems?",
//                 "titleTag": "h2",
//                 "id": "1709379462796_o6at890229"
//             },
//             {
//                 "title": "description",
//                 "content": "TeleCMI is dedicated to providing cost-effective solutions, which helps to alleviate the financial burden that is associated with high maintenance costs in traditional setups. Additionally, TeleCMI offers Cloud PBX pricing models that cater to various business needs, ensuring that companies can access advanced communication features without compromising their budget.",
//                 "id": "1709379462796_2unttu36t4"
//             },
//             {
//                 "title": "description",
//                 "content": "We have an amazingly responsive sales team waiting to hear from you. \nRequest a personalized 15-minute demo to get started and launch your platform within the next four days.\n\n",
//                 "id": "1709379468115_az5adwjwyr"
//             },
//             {
//                 "title": "description",
//                 "content": "Or you can contact our sales team to learn more about TeleCMI.",
//                 "id": "1709379468496_937lwy18l8"
//             },
//             {
//                 "title": "button",
//                 "content": "try your free trial",
//                 "id": "1709379508047_5u0smjroi8"
//             }
//         ]
//     },
//     {
//         "type": "faq",
//         "data": [
//             {
//                 "question": "Can I get a refund?",
//                 "answer": "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
//                 "id": "1709379552160_pkaj24k9bu"
//             },
//             {
//                 "question": "Do you have a CRM Integration feature?",
//                 "answer": "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
//                 "id": "1709379534555_19bhx515ec"
//             },
//             {
//                 "question": "Do you provide desktop and mobile apps?",
//                 "answer": "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
//                 "id": "1709379551548_jthe83pum"
//             },
//             {
//                 "question": "Do you offer SMS services for India and International countries?",
//                 "answer": "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
//                 "id": "1709379552524_8pytjgcyw4"
//             },
//             {
//                 "question": "Does TeleCMI provide an API?",
//                 "answer": "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
//                 "id": "1709379552704_3l9r2mvfby"
//             }
//         ],
//         "id": "1709379534555_1pfmmvv9vj"
//     }
// ]