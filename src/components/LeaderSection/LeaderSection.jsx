import { motion, useInView } from "framer-motion";
import ButtonOutline from "../../Button/ButtonOutline";
import useUsers from "../../hooks/useUsers";
import { Link } from "react-router-dom";

const LeaderSection = ({ ceoRef }) => {
    const { users } = useUsers({ role: "directors" });

    const isCeoInView = useInView(ceoRef, { once: true, margin: "-100px" });

    const ceocardVariants = {
        hidden: { opacity: 0, y: 40 },
        visible: (i) => ({
            opacity: 1,
            y: 0,
            transition: {
                delay: i * 0.2,
                duration: 0.6,
                ease: "easeOut",
            },
        }),
    };

    return (
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
            <div className="grid gap-8">
                {
                    users.map((ceo, index) => (
                        <motion.div
                            key={index}
                            className="relative flex flex-col overflow-hidden transition duration-300 transform bg-gray-900 shadow-lg group rounded-xl hover:-translate-y-2 md:flex-row"
                            initial="hidden"
                            animate={isCeoInView ? "visible" : "hidden"}
                            custom={index}
                            variants={ceocardVariants}
                        >
                            {/* Image Section */}
                            <div className="w-full md:w-1/2">
                                <div className="aspect-w-16 aspect-h-9 md:aspect-w-1 md:aspect-h-1">
                                    <img
                                        src={ceo.image}
                                        alt={`${ceo.first_name} ${ceo.last_name}`}
                                        title={`${ceo.first_name} ${ceo.last_name}`}
                                        className="object-cover w-full h-80"
                                    />
                                </div>
                            </div>

                            {/* Content Section */}
                            <div className="p-6 md:w-1/2">
                                <h3 className="text-[25px] font-semibold text-[#B3225F] cursor-pointer">
                                    {ceo.first_name} {ceo.last_name}
                                </h3>
                                <p className="text-[#15919B] font-medium mb-2">
                                    {ceo.position}
                                </p>
                                <p className="mb-4 text-gray-400">{ceo.aboutme}</p>

                                {/* Optional social links */}
                                <div className="flex items-center gap-3 mb-4">
                                    {ceo.social &&
                                        Object.entries(ceo.social || {}).map(([platform, url]) => (
                                            <a
                                                key={platform}
                                                href={url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-gray-400 hover:text-[#0066cc] transition-colors"
                                                title={platform}
                                            >
                                                <i className={`fab fa-${platform} text-xl`}></i>
                                            </a>
                                        ))}
                                </div>

                                <Link
                                    to={`/experts/${ceo.id}`}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <ButtonOutline>Details</ButtonOutline>
                                </Link>
                            </div>
                        </motion.div>
                    ))}
            </div>
        </div >
    );
};

export default LeaderSection;
