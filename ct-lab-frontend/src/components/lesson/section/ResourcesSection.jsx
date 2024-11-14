import { BookOpen, Download, FileText, Link, Video } from 'lucide-react';
import React from 'react';
import styles from '../../../styles/LessonDetail.module.css';

const ResourcesSection = ({ lesson }) => {
    if (!lesson) {
        return <div className={styles.error}>Lesson data not available</div>;
    }
    
    return (
        <div className={styles.resources_section}>
            {/* Additional Reading */}
            <div className={styles.section}>
                <h2>Additional Reading</h2>
                <div className={styles.resources_grid}>
                    {lesson.additionalReading?.map((resource, index) => (
                        <a 
                            key={index} 
                            href={resource.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={styles.resource_card}
                        >
                            <BookOpen size={20} />
                            <div>
                                <h3>{resource.title}</h3>
                                <p>{resource.description}</p>
                            </div>
                        </a>
                    ))}
                </div>
            </div>

            {/* Related Resources */}
            <div className={styles.section}>
                <h2>Related Materials</h2>
                <div className={styles.resources_list}>
                    {/* Videos */}
                    <div className={styles.resource_category}>
                        <h3>
                            <Video size={20} />
                            Video Tutorials
                        </h3>
                        <ul>
                            {lesson.videos?.map((video, index) => (
                                <li key={index}>
                                    <a href={video.url} target="_blank" rel="noopener noreferrer">
                                        {video.title}
                                    </a>
                                    <span>{video.duration}</span>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* PDFs/Documents */}
                    <div className={styles.resource_category}>
                        <h3>
                            <FileText size={20} />
                            Documents & Guides
                        </h3>
                        <ul>
                            {lesson.documents?.map((doc, index) => (
                                <li key={index}>
                                    <a href={doc.url} download>
                                        {doc.title}
                                        <Download size={16} />
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* External Links */}
                    <div className={styles.resource_category}>
                        <h3>
                            <Link size={20} />
                            External Resources
                        </h3>
                        <ul>
                            {lesson.externalLinks?.map((link, index) => (
                                <li key={index}>
                                    <a href={link.url} target="_blank" rel="noopener noreferrer">
                                        {link.title}
                                    </a>
                                    <p>{link.description}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResourcesSection;