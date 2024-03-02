import React, { Component, createRef } from 'react';
import { Dialog, Transition, Disclosure } from '@headlessui/react';
import { AtSymbolIcon, CalendarIcon, ClockIcon, XMarkIcon, MinusSmallIcon, PlusSmallIcon } from '@heroicons/react/24/outline';
import AppStateContext from '../../../utils/AppStateContext';
import '../../../assets/scroll.css'

const people = ['Unconditional forwarding', 'Cold transfer']

const faqs = [
    {
        question: "Do you have a CRM Integration feature?",
        answer: "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
    },
    {
        question: "Do you provide desktop and mobile apps?",
        answer: "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
    },
    {
        question: "Can I get a refund?",
        answer: "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
    },
    {
        question: "Do you offer SMS services for India and International countries?",
        answer: "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
    },
    {
        question: "Does TeleCMI provide an API?",
        answer: "Yes, you can integrate your CRM and other business tools into the TeleCMI business phone system.",
    }
]

class Example extends Component {

    static contextType = AppStateContext
    constructor(props) {
        super(props);
        this.state = {
            open: true
        };
    }

    close = () => {
        const { setPreview } = this.context
        setPreview(false)
    }

    componentDidMount() {
        console.log(this.props.previewData)
    }

    render() {

        return (
            <Transition.Root show={this.context.preview}>
                <Dialog as="div" className="relative z-10 w-full" onClose={() => this.close()}>
                    <Transition.Child
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    <div className="fixed left-72 inset-0 z-10 overflow-y-auto">
                        <div className="flex relative min-h-full h-full justify-center p-4 text-center sm:items-center sm:p-0">
                            <Transition.Child
                                enter="ease-out duration-300"
                                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                enterTo="opacity-100 translate-y-0 sm:scale-100"
                                leave="ease-in duration-200"
                                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                                className='w-[95%] h-[95%] relative rounded-lg  px-12 bg-[#f7f7f7] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-100 pb-10'
                            >
                                <div className=' fixed -ml-14 -mt-4 w-8 h-8 shadow-md rounded-full bg-white flex justify-center items-center cursor-pointer z-10' onClick={this.close}>
                                    <XMarkIcon className='w-5' />
                                </div>
                                <div className='flex flex-col gap-y-14 mt-5' >
                                    <div className='flex'>
                                        <div className='w-3/4 flex'>
                                            <div className='w-11/12 pr-10'>
                                                <h1 className=' text-left text-[#2b2e33] text-[40px] font-medium leading-[1.25]'>
                                                    Best business phone system for
                                                    businesses: why is VoIP phone system
                                                    the winner In 2024?
                                                </h1>
                                            </div>
                                        </div>
                                        <div className='w-1/4 flex flex-col items-center justify-center'>
                                            <div className='gap-y-1 flex flex-col'>
                                                <div className='flex gap-x-2'>
                                                    <ClockIcon className='w-4 text-[#2BAC58]' />
                                                    <p className='text-xs text-[#898e99]'>10 mins read</p>
                                                </div>
                                                <div className='flex gap-x-2'>
                                                    <CalendarIcon className='w-4 text-[#2BAC58]' />
                                                    <p className='text-xs text-[#898e99]'>Posted on Feb 10, 2024</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='flex '>
                                        <div className='w-3/4 flex'>
                                            <div className='w-11/12 rounded-3xl overflow-hidden'>
                                                <img className='w-full' src="/sample.webp" alt="" />
                                            </div>
                                        </div>
                                        <div className='w-1/4 flex flex-col items-center justify-end'>
                                            <div className='flex flex-col gap-y-8'>
                                                <div className='bg-white w-16 h-40 rounded-lg shadow-md flex flex-col justify-evenly items-center'>
                                                    <img className='w-4 ' src="/soc_twi.webp" alt="" />
                                                    <img className='w-4' src="/soc_ins.webp" alt="" />
                                                    <img className='w-4' src="/soc_lin.webp" alt="" />
                                                    <img className='w-4' src="/soc_fac.webp" alt="" />
                                                </div>
                                                <div className='flex flex-col items-center justify-center gap-y-3 bg-white w-32 h-32 rounded-xl shadow-md'>
                                                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                                                        <img style={{ width: '100%', height: '100%', objectFit: 'cover' }} src="/sample.webp" alt="" />
                                                    </div>
                                                    <div className='text-center w-24 flex flex-col gap-y-1'>
                                                        <p className='text-xs font-medium whitespace-nowrap overflow-hidden overflow-ellipsis'>Haritha Ganta</p>
                                                        <p className='text-[11px] whitespace-nowrap overflow-hidden overflow-ellipsis'>Content Marketer</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>


                                <div className='flex justify-around  gap-14 mt-20' >
                                    <div className='w-1/4 flex flex-col gap-y-6'>
                                        <div className='py-10 px-3 flex flex-col gap-y-4 bg-white shadow-md rounded-2xl text-left'>
                                            <p className='text-[#898e99] text-base font-medium'>Introduction</p>
                                            <p className='text-[#898e99] text-base font-medium'>What is an on-premises PBX system?</p>
                                            <p className='text-[#898e99] text-base font-medium'>What is a cloud PBX phone system?</p>
                                            <p className='text-[#898e99] text-base font-medium'>The advantages of cloud PBX solutions</p>
                                            <p className='text-[#898e99] text-base font-medium'>Identifying hardware failure warning signs</p>
                                        </div>
                                        <div className='bg-gradient-to-br from-[#15aa51] to-[#2489f3] h-64 w-full flex flex-col p-8 justify-between rounded-lg'>
                                            <p className='text-white text-base text-left'>Make your <br /> business call now</p>
                                            <p className='text-white text-2xl font-bold text-left'>
                                                Get started with our free trial
                                            </p>
                                            <div className='flex justify-start'>
                                                <button className='text-[#2b2e33] h-10 bg-white px-4 rounded-md uppercase text-sm font-bold'>
                                                    Book a free demo
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className='w-3/4 gap-y-8 flex flex-col items-start'>
                                        <div className='flex justify-start'>
                                            <p className='text-left text-[#2b2e33] text-base'>
                                                Is your business still relying on an on-premises PBX system? It might be time for a change. If you've faced issues like hardware failures, location limitations, and high maintenance costs with your on-premises PBX, the signs are a clear indication that you need to shift. In this article, we will look into the benefits of transitioning to a Cloud PBX phone system. Don't settle for outdated features any longer. Embrace a superior, more flexible, efficient, and cost-effective solution today.
                                            </p>
                                        </div>
                                        <div className='flex flex-col gap-y-3'>
                                            <div>
                                                <h2 className='text-[#2b2e33] text-2xl font-bold text-left'>
                                                    What is an on-premises PBX system?
                                                </h2>
                                            </div>
                                            <div>
                                                <p className='text-[#2b2e33] text-left'>
                                                    An On-Premises PBX System, or Private Branch Exchange, is a traditional business phone system that operates within a company's physical location. The entire phone system, including hardware and infrastructure, is hosted on-site. Modern telephony solutions like Cloud PBX use Cloud-Based Technology and off-site servers.
                                                </p>
                                            </div>
                                            <div>
                                                <p className='text-[#2b2e33] text-left'>
                                                    This gives businesses direct control over their telephony operations. However, this model comes with considerations like higher upfront costs, ongoing maintenance responsibilities, and limited scalability compared to cloud-based solutions.
                                                </p>
                                            </div>
                                            <div className='w-11/12 overflow-hidden rounded-2xl my-2'>
                                                <img className='' src="/sample.webp" alt="" />
                                            </div>
                                        </div>
                                        <div className='flex flex-col gap-y-3'>
                                            <div>
                                                <h2 className='text-[#2b2e33] text-2xl font-bold text-left'>
                                                    What is a cloud PBX phone system?
                                                </h2>
                                            </div>
                                            <div>
                                                <p className='text-[#2b2e33] text-left'>
                                                    A Cloud PBX Phone System, also known as Cloud-Hosted PBX, is a modern and flexible business phone solution that operates in the cloud instead of on location. Unlike traditional On-Premises PBX systems, Cloud PBX uses servers managed by a service provider in an off-site location. This shift to the cloud offers several benefits, such as enhanced scalability, reduced maintenance burdens, and often more cost-effective solutions.
                                                </p>
                                            </div>

                                            {/* table */}

                                            <div className="">
                                                <div className="mt-8 flow-root">
                                                    <div className=" overflow-x-auto">
                                                        <div className="inline-block min-w-full py-2">
                                                            <div className="overflow-hidden shadow  rounded-lg">
                                                                <table className="min-w-full">
                                                                    <thead className="bg-[#2b2e33]">
                                                                        <tr className='divide-x'>
                                                                            <th scope="col" className="w-1/2 p-4 text-center text-base font-bold text-white">
                                                                                Call forwarding
                                                                            </th>
                                                                            <th scope="col" className="w-1/2 p-4 text-center text-base font-bold text-white">
                                                                                Call forwarding
                                                                            </th>
                                                                        </tr>
                                                                    </thead>
                                                                    <tbody className=" divide-x divide-y border-green-600 bg-white">
                                                                        {people.map((person, index) => (
                                                                            <tr key={index} className='divide-x'>
                                                                                <td className="whitespace-nowrap text-sm  text-gray-900 p-4">
                                                                                    {person}
                                                                                </td>
                                                                                <td className="whitespace-nowrap text-sm text-gray-900 p-4">{person}</td>
                                                                            </tr>
                                                                        ))}
                                                                    </tbody>
                                                                </table>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-y-3'>
                                            <div>
                                                <h2 className='text-[#2b2e33] text-xl font-bold text-left'>
                                                    Key features:
                                                </h2>
                                            </div>
                                            <ul className='flex flex-col gap-y-3 list-disc pl-8'>
                                                <li className='text-[#2b2e33] text-left'>
                                                    <b>Scalability:</b> Businesses can easily adjust their phone system up or down based on their facing changing needs.
                                                </li>
                                                <li className='text-[#2b2e33] text-left'>
                                                    <b>Cost-Efficiency:</b> As businesses do not need to invest in on-site hardware, which can significantly reduce both upfront costs and maintenance expenses.
                                                </li>
                                                <li className='text-[#2b2e33] text-left'>
                                                    <b>Advanced features:</b> Cloud PBX often comes with Advanced Features such as voicemail-to-email, call forwarding, and auto-attendants to enhance the overall user experience.
                                                </li>
                                            </ul>
                                        </div>

                                        {/* recommended reading */}

                                        <div className='flex w-full'>
                                            <div className='bg-gradient-to-br from-[#10d7e2] via-[#45b5e9]  to-[#9358f7] h-36 w-[150px] flex flex-col p-8 justify-between rounded-l-xl'>
                                            </div>
                                            <div className='bg-[#2b2e33] flex flex-col justify-center pl-8 gap-y-2 w-full rounded-r-xl'>
                                                <div>
                                                    <h2 className='text-[#f0f1f2] text-lg font-bold text-left'>
                                                        Recommended reading
                                                    </h2>
                                                </div>
                                                <ul className='flex flex-col list-disc pl-8 gap-y-3'>
                                                    <li className='text-[#f0f1f2] text-base text-left'>
                                                        How cloud call center technology revolutionizes customer service?
                                                    </li>
                                                    <li className='text-[#f0f1f2] text-base text-left'>
                                                        It's time to shift from on-premises to cloud PBX phone system
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-y-3'>
                                            <div>
                                                <h2 className='text-[#2b2e33] text-2xl font-bold text-left'>
                                                    The advantages of cloud PBX solutions
                                                </h2>
                                            </div>
                                            <div className='flex flex-col gap-y-3'>
                                                <p className='text-[#2b2e33] text-left'>
                                                    In today's rapidly evolving business communication landscape, Cloud PBX Solutions emerge as a game-changer, offering a wide range of the benefits that redefine the way organizations communicate and collaborate.
                                                </p>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-y-3'>
                                            <div>
                                                <h3 className='text-[#2b2e33] text-xl font-bold text-left'>
                                                    1. Achieving flexibility without being bound by locations
                                                </h3>
                                            </div>
                                            <div className='flex flex-col gap-y-3'>
                                                <p className='text-[#2b2e33] text-left'>
                                                    In today's rapidly evolving business communication landscape, Cloud PBX Solutions emerge as a game-changer, offering a wide range of the benefits that redefine the way organizations communicate and collaborate.
                                                </p>
                                            </div>
                                            <div>
                                                <h3 className='text-[#2b2e33] text-xl font-bold text-left'>
                                                    2. Analyzing the costs of maintenance compared with on-premises solutions
                                                </h3>
                                            </div>
                                            <div className='flex flex-col gap-y-3'>
                                                <p className='text-[#2b2e33] text-left'>
                                                    Cloud PBX is the ultimate solution for businesses looking to break free from the limitations of physical locations. Unlike on-premises systems, Cloud PBX enables users to connect and communicate effortlessly from anywhere with an internet connection. It provides super flexibility and empowering remote work capabilities. With Cloud PBX, communication is not bound by the walls of an office, and businesses can unleash their full potential regardless of their location.
                                                </p>
                                            </div>
                                        </div>

                                        {/* CTA button */}

                                        <div className='flex w-full my-4'>
                                            <div className='bg-gradient-to-br from-[#15aa51] to-[#2489f3] h-36 w-full flex justify-evenly   rounded-xl'>
                                                <div className=' flex flex-col justify-center items-start'>
                                                    <p className='text-white'>Make your business call now</p>
                                                    <h3 className='text-white text-3xl font-bold'>
                                                        Get started with our free trial
                                                    </h3>
                                                </div>
                                                <div className='flex items-center'>
                                                    <button className='cursor-pointer uppercase text-sm text-[#2b2e33] font-bold bg-white w-fit h-10 px-4 rounded-[4px]'>
                                                        start free TRail
                                                    </button>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-y-3'>
                                            <div>
                                                <h3 className='text-[#2b2e33] text-2xl font-bold text-left'>
                                                    Identifying hardware failure warning signs
                                                </h3>
                                            </div>
                                            <div className='flex flex-col gap-y-3'>
                                                <p className='text-[#2b2e33] text-left'>
                                                    Maintaining a healthy hardware infrastructure is absolutely critical for seamless business operations. Recognizing warning signs of hardware failure is crucial in maintaining an efficient communication system, whether traditional or considering a shift to advanced solutions like Cloud PBX.
                                                </p>
                                            </div>
                                            <div className='w-11/12 overflow-hidden rounded-2xl my-2'>
                                                <img className='' src="/sample.webp" alt="" />
                                            </div>

                                            <div className='flex flex-col gap-y-3'>
                                                <div>
                                                    <h2 className='text-[#2b2e33] text-xl font-bold text-left'>
                                                        Key features:
                                                    </h2>
                                                </div>
                                                <ul className='flex flex-col gap-y-3 list-disc pl-8'>
                                                    <li className='text-[#2b2e33] text-left'>
                                                        <b>Scalability:</b> Businesses can easily adjust their phone system up or down based on their facing changing needs.
                                                    </li>
                                                    <li className='text-[#2b2e33] text-left'>
                                                        <b>Cost-Efficiency:</b> As businesses do not need to invest in on-site hardware, which can significantly reduce both upfront costs and maintenance expenses.
                                                    </li>
                                                    <li className='text-[#2b2e33] text-left'>
                                                        <b>Advanced features:</b> Cloud PBX often comes with Advanced Features such as voicemail-to-email, call forwarding, and auto-attendants to enhance the overall user experience.
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>

                                        {/* testimonials */}

                                        <div className='flex w-[90%] h-auto py-10 px-5 my-6 gap-x-5 border-t-[2px] border-b-[2px]'>
                                            <div className='flex items-start'>
                                                <AtSymbolIcon className='w-10' />
                                            </div>
                                            <div className='flex flex-col gap-y-5'>
                                                <div>
                                                    <p className='text-[#222222] text-2xl font-semibold font-dmsans text-left'>
                                                        Lorem ipsum dolor sit amet, consectetur eliton tadipiscing elit. Nunc vulputate aliquet odio adrm dolor sit amet mattis. ad litora fnit aliquet vulputate aptent.”
                                                    </p>
                                                </div>
                                                <div className='flex gap-x-5'>
                                                    <div className='w-12 h-12 rounded-full overflow-hidden'>
                                                        <img className='w-full h-full' src="/sample.webp" alt="" />
                                                    </div>
                                                    <div className='flex flex-col gap-y-1 items-start'>
                                                        <p className='text-[#222222] font-semibold'> John Ashutosh</p>
                                                        <p className='text-[#6b727f] text-sm'>
                                                            Customer Relations Manager
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className='flex flex-col gap-y-5'>
                                            <div>
                                                <h3 className='text-[#2b2e33] text-2xl font-bold text-left'>
                                                    Why TeleCMI stands out In cloud PBX systems?
                                                </h3>
                                            </div>
                                            <div className='flex flex-col gap-y-3'>
                                                <p className='text-[#2b2e33] text-left'>
                                                    TeleCMI is dedicated to providing cost-effective solutions, which helps to alleviate the financial burden that is associated with high maintenance costs in traditional setups. Additionally, TeleCMI offers Cloud PBX pricing models that cater to various business needs, ensuring that companies can access advanced communication features without compromising their budget.
                                                </p>
                                                <p className='text-[#2b2e33] text-left font-medium'>
                                                    We have an amazingly responsive sales team waiting to hear from you.
                                                    Request a personalized 15-minute demo to get started and launch your platform within the next four days.
                                                </p>
                                                <p className='text-[#2b2e33] text-left font-medium'>
                                                    Or you can contact our sales team to learn more about TeleCMI.
                                                </p>
                                            </div>
                                            <div className='flex justify-start'>
                                                <button className=' uppercase text-white text-sm font-bold rounded-[4px] py-3 px-4 font-heebo bg-gradient-to-r from-[#18b04c] to-[#288df9]'>
                                                    try your free trial
                                                </button>
                                            </div>
                                        </div>

                                        {/* FAQ */}

                                        <div className="w-full divide-y divide-gray-900/10 my-6">
                                            <h2 className="text-2xl text-left font-bold leading-10 tracking-tight text-gray-900">Frequently asked questions (FAQ)</h2>
                                            <dl className="mt-10 space-y-6 divide-y divide-gray-900/10">
                                                {faqs.map((faq) => (
                                                    <Disclosure as="div" key={faq.question} className="pt-6">
                                                        {({ open }) => (
                                                            <>
                                                                <dt>
                                                                    <Disclosure.Button className="flex w-full items-start justify-between text-left text-[#2b2e33]">
                                                                        <span className="text-xl font-medium leading-7">{faq.question}</span>
                                                                        <span className="ml-6 flex h-7 items-center">
                                                                            {open ? (
                                                                                <MinusSmallIcon className="h-6 w-6 text-[#77bf49]" aria-hidden="true" />
                                                                            ) : (
                                                                                <PlusSmallIcon className="h-6 w-6 text-[#77bf49]" aria-hidden="true" />
                                                                            )}
                                                                        </span>
                                                                    </Disclosure.Button>
                                                                </dt>
                                                                <Disclosure.Panel as="dd" className="mt-2 pr-12 text-left">
                                                                    <p className="text-base leading-7 text-[#2b2e33]">{faq.answer}</p>
                                                                </Disclosure.Panel>
                                                            </>
                                                        )}
                                                    </Disclosure>
                                                ))}
                                            </dl>
                                        </div>

                                    </div>
                                </div>

                                {/* comment section */}

                                <div className='bg-white w-full h-auto shadow-sm rounded-xl py-5 gap-y-5 my-14 flex  flex-col px-8'>
                                    <div className='flex justify-start'>
                                        <h3 className='text-2xl text-[#2b2e33] font-bold font-heebo'>
                                            Leave a comment
                                        </h3>
                                    </div>
                                    <div className='flex flex-col gap-y-3 items-start w-full'>
                                        <label className='text-[#6b727f]'>
                                            Comment*
                                        </label>
                                        <textarea className='w-full bg-[#f6f6f6] border-[#e1e3e5] rounded-[10px]' rows="5">

                                        </textarea>
                                    </div>

                                    <div className='flex gap-x-12'>
                                        <div className='flex flex-col gap-y-3 items-start w-full'>
                                            <label className='text-[#6b727f]'>
                                                Name*
                                            </label>
                                            <input className='w-full bg-[#f6f6f6] border-[#e1e3e5] rounded-[10px]'>

                                            </input>
                                        </div>
                                        <div className='flex flex-col gap-y-3 items-start w-full'>
                                            <label className='text-[#6b727f]'>
                                                Email*
                                            </label>
                                            <input className='w-full bg-[#f6f6f6] border-[#e1e3e5] rounded-[10px]'>

                                            </input>
                                            <label className='text-[#a6aab2]'>
                                                The email address you provide will not be published
                                            </label>
                                        </div>
                                    </div>
                                    <div className='flex justify-start'>
                                        <button className=' uppercase text-white text-sm font-bold rounded-[4px] py-4 px-10 font-heebo bg-gradient-to-r from-[#18b04c] to-[#288df9]'>
                                            Post Comment
                                        </button>
                                    </div>
                                </div>

                            </Transition.Child>
                        </div>
                    </div>
                </Dialog>
            </Transition.Root>
        );
    }
}

export default Example;
