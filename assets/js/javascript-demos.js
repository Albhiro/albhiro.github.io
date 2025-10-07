// ===========================================
// JAVASCRIPT DEMOS - GITHUB PAGES READY
// ===========================================

class JavaScriptDemos {
    constructor() {
        this.initializeDemos();
    }

    initializeDemos() {
        this.setupEmailProcessor();
        this.setupDataAnalysisToolkit();
        this.setupNLPProcessor();
    }

    // EMAIL PROCESSOR - JavaScript version
    setupEmailProcessor() {
        const emailDemo = {
            // Mock IMAP data
            mockEmails: [
                { id: 1, subject: 'Informe Proyecto Alpha', from: 'manager@santander.com', priority: 'high', date: '2024-01-15' },
                { id: 2, subject: 'Reunión equipo desarrollo', from: 'team@santander.com', priority: 'medium', date: '2024-01-16' },
                { id: 3, subject: 'Revisión código backend', from: 'tech@santander.com', priority: 'high', date: '2024-01-17' },
                { id: 4, subject: 'Newsletter tecnología', from: 'newsletter@tech.com', priority: 'low', date: '2024-01-18' },
                { id: 5, subject: 'Bug crítico producción', from: 'alerts@santander.com', priority: 'critical', date: '2024-01-19' }
            ],

            processEmails() {
                const processed = this.mockEmails.map(email => ({
                    ...email,
                    processed: true,
                    category: this.categorizeEmail(email.subject),
                    sentiment: this.analyzeSentiment(email.subject),
                    actionRequired: this.determineAction(email.priority)
                }));

                return {
                    total: processed.length,
                    highPriority: processed.filter(e => e.priority === 'high' || e.priority === 'critical').length,
                    actionRequired: processed.filter(e => e.actionRequired).length,
                    categories: this.getCategoryStats(processed),
                    processed: processed
                };
            },

            categorizeEmail(subject) {
                const categories = {
                    'technical': ['bug', 'código', 'desarrollo', 'backend', 'api'],
                    'meeting': ['reunión', 'meeting', 'call', 'junta'],
                    'report': ['informe', 'report', 'reporte', 'datos'],
                    'alert': ['crítico', 'alert', 'urgente', 'problema'],
                    'newsletter': ['newsletter', 'boletín', 'noticias']
                };

                for (const [category, keywords] of Object.entries(categories)) {
                    if (keywords.some(keyword => subject.toLowerCase().includes(keyword))) {
                        return category;
                    }
                }
                return 'general';
            },

            analyzeSentiment(text) {
                const positiveWords = ['excelente', 'bueno', 'éxito', 'completado', 'perfecto'];
                const negativeWords = ['crítico', 'bug', 'problema', 'error', 'fallo'];
                
                const positive = positiveWords.some(word => text.toLowerCase().includes(word));
                const negative = negativeWords.some(word => text.toLowerCase().includes(word));
                
                if (negative) return 'negative';
                if (positive) return 'positive';
                return 'neutral';
            },

            determineAction(priority) {
                return ['high', 'critical'].includes(priority);
            },

            getCategoryStats(emails) {
                return emails.reduce((stats, email) => {
                    stats[email.category] = (stats[email.category] || 0) + 1;
                    return stats;
                }, {});
            }
        };

        // Expose to global for demo
        window.EmailProcessor = emailDemo;
    }

    // DATA ANALYSIS TOOLKIT - JavaScript version
    setupDataAnalysisToolkit() {
        const dataAnalysis = {
            // Generate mock project data
            generateMockData(records = 100) {
                const projects = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
                const developers = ['Luis', 'María', 'Carlos', 'Ana', 'Pedro'];
                const data = [];

                for (let i = 0; i < records; i++) {
                    data.push({
                        id: i + 1,
                        project: projects[Math.floor(Math.random() * projects.length)],
                        developer: developers[Math.floor(Math.random() * developers.length)],
                        hours: Math.floor(Math.random() * 40) + 10,
                        date: new Date(2024, Math.floor(Math.random() * 12), Math.floor(Math.random() * 28) + 1),
                        status: Math.random() > 0.8 ? 'completed' : 'in-progress',
                        priority: Math.random() > 0.7 ? 'high' : Math.random() > 0.4 ? 'medium' : 'low'
                    });
                }

                return data;
            },

            // Statistical functions
            mean(values) {
                return values.reduce((a, b) => a + b, 0) / values.length;
            },

            median(values) {
                const sorted = [...values].sort((a, b) => a - b);
                const mid = Math.floor(sorted.length / 2);
                return sorted.length % 2 ? sorted[mid] : (sorted[mid - 1] + sorted[mid]) / 2;
            },

            standardDeviation(values) {
                const avg = this.mean(values);
                const squareDiffs = values.map(value => Math.pow(value - avg, 2));
                return Math.sqrt(this.mean(squareDiffs));
            },

            // Analysis functions
            analyzeProjectData(data) {
                const analysis = {
                    totalRecords: data.length,
                    totalHours: data.reduce((sum, record) => sum + record.hours, 0),
                    averageHours: this.mean(data.map(r => r.hours)),
                    medianHours: this.median(data.map(r => r.hours)),
                    stdDeviation: this.standardDeviation(data.map(r => r.hours)),
                    
                    projectStats: this.groupBy(data, 'project').map(group => ({
                        project: group.key,
                        totalHours: group.items.reduce((sum, item) => sum + item.hours, 0),
                        averageHours: this.mean(group.items.map(item => item.hours)),
                        recordCount: group.items.length,
                        completedTasks: group.items.filter(item => item.status === 'completed').length
                    })),
                    
                    developerStats: this.groupBy(data, 'developer').map(group => ({
                        developer: group.key,
                        totalHours: group.items.reduce((sum, item) => sum + item.hours, 0),
                        averageHours: this.mean(group.items.map(item => item.hours)),
                        productivity: group.items.filter(item => item.status === 'completed').length / group.items.length
                    })),
                    
                    priorityDistribution: this.groupBy(data, 'priority').map(group => ({
                        priority: group.key,
                        count: group.items.length,
                        percentage: (group.items.length / data.length * 100).toFixed(1)
                    })),
                    
                    timeSeriesData: this.generateTimeSeries(data)
                };

                return analysis;
            },

            groupBy(array, key) {
                const groups = array.reduce((groups, item) => {
                    const groupKey = item[key];
                    if (!groups[groupKey]) {
                        groups[groupKey] = [];
                    }
                    groups[groupKey].push(item);
                    return groups;
                }, {});

                return Object.keys(groups).map(key => ({
                    key,
                    items: groups[key]
                }));
            },

            generateTimeSeries(data) {
                const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                              'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                
                const monthlyData = data.reduce((acc, record) => {
                    const month = months[record.date.getMonth()];
                    if (!acc[month]) {
                        acc[month] = { hours: 0, tasks: 0 };
                    }
                    acc[month].hours += record.hours;
                    acc[month].tasks += 1;
                    return acc;
                }, {});

                return months.map(month => ({
                    month,
                    hours: monthlyData[month]?.hours || 0,
                    tasks: monthlyData[month]?.tasks || 0
                }));
            },

            // Machine Learning simulation
            predictProjectCompletion(projectData) {
                // Simple linear regression simulation
                const completedTasks = projectData.filter(task => task.status === 'completed');
                const avgHoursPerTask = this.mean(completedTasks.map(task => task.hours));
                const pendingTasks = projectData.filter(task => task.status === 'in-progress');
                
                return {
                    estimatedHours: pendingTasks.length * avgHoursPerTask,
                    estimatedDays: Math.ceil(pendingTasks.length * avgHoursPerTask / 8),
                    confidence: Math.min(completedTasks.length / 10, 1) * 100 // Max 100%
                };
            }
        };

        // Expose to global for demo
        window.DataAnalysisToolkit = dataAnalysis;
    }

    // NLP SPANISH PROCESSOR - JavaScript version
    setupNLPProcessor() {
        const nlpProcessor = {
            // Spanish stopwords
            spanishStopwords: new Set([
                'el', 'la', 'de', 'que', 'y', 'a', 'en', 'un', 'es', 'se', 'no', 'te', 'lo', 'le', 'da', 'su', 'por', 'son', 
                'con', 'para', 'al', 'una', 'las', 'del', 'los', 'esta', 'pero', 'sus', 'me', 'hasta', 'hay', 'donde', 
                'han', 'quien', 'están', 'estado', 'desde', 'todo', 'nos', 'durante', 'todos', 'uno', 'les', 'ni', 'contra'
            ]),

            // Text preprocessing
            preprocessText(text) {
                return text
                    .toLowerCase()
                    .replace(/[^\w\s]/g, ' ')
                    .replace(/\s+/g, ' ')
                    .trim();
            },

            // Tokenization
            tokenize(text) {
                return this.preprocessText(text)
                    .split(' ')
                    .filter(token => token.length > 0 && !this.spanishStopwords.has(token));
            },

            // Sentiment Analysis (rule-based)
            analyzeSentiment(text) {
                const positiveWords = new Set([
                    'bueno', 'excelente', 'fantástico', 'increíble', 'perfecto', 'genial', 'maravilloso', 
                    'estupendo', 'magnífico', 'extraordinario', 'exitoso', 'brillante', 'impresionante',
                    'amor', 'feliz', 'alegre', 'contento', 'satisfecho', 'orgulloso', 'emocionado'
                ]);

                const negativeWords = new Set([
                    'malo', 'terrible', 'horrible', 'pésimo', 'awful', 'deplorable', 'desastroso',
                    'fracaso', 'error', 'problema', 'crítico', 'grave', 'preocupante', 'difícil',
                    'triste', 'enojado', 'frustrado', 'decepcionado', 'molesto', 'furioso'
                ]);

                const tokens = this.tokenize(text);
                let positiveScore = 0;
                let negativeScore = 0;

                tokens.forEach(token => {
                    if (positiveWords.has(token)) positiveScore++;
                    if (negativeWords.has(token)) negativeScore++;
                });

                const totalScore = positiveScore - negativeScore;
                const sentiment = totalScore > 0 ? 'positive' : totalScore < 0 ? 'negative' : 'neutral';
                const confidence = Math.abs(totalScore) / tokens.length;

                return {
                    sentiment,
                    confidence: Math.min(confidence, 1),
                    scores: {
                        positive: positiveScore,
                        negative: negativeScore,
                        neutral: tokens.length - positiveScore - negativeScore
                    }
                };
            },

            // Text summarization (extractive)
            summarizeText(text, maxSentences = 3) {
                const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0);
                if (sentences.length <= maxSentences) return text;

                // Score sentences based on word frequency
                const wordFreq = this.getWordFrequency(text);
                const sentenceScores = sentences.map(sentence => {
                    const words = this.tokenize(sentence);
                    const score = words.reduce((sum, word) => sum + (wordFreq[word] || 0), 0);
                    return { sentence: sentence.trim(), score: score / words.length };
                });

                // Return top sentences
                return sentenceScores
                    .sort((a, b) => b.score - a.score)
                    .slice(0, maxSentences)
                    .map(item => item.sentence)
                    .join('. ') + '.';
            },

            // Word frequency analysis
            getWordFrequency(text) {
                const tokens = this.tokenize(text);
                const frequency = {};
                
                tokens.forEach(token => {
                    frequency[token] = (frequency[token] || 0) + 1;
                });

                return frequency;
            },

            // Entity extraction (basic)
            extractEntities(text) {
                const entities = {
                    emails: text.match(/\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b/g) || [],
                    urls: text.match(/https?:\/\/[^\s]+/g) || [],
                    dates: text.match(/\d{1,2}\/\d{1,2}\/\d{4}|\d{1,2}-\d{1,2}-\d{4}/g) || [],
                    numbers: text.match(/\b\d+\b/g) || []
                };

                return entities;
            },

            // Text classification
            classifyText(text) {
                const categories = {
                    technical: ['código', 'programación', 'desarrollo', 'software', 'api', 'base de datos', 'servidor'],
                    business: ['proyecto', 'cliente', 'reunión', 'presupuesto', 'venta', 'marketing', 'estrategia'],
                    personal: ['familia', 'amigos', 'casa', 'vacaciones', 'comida', 'deporte', 'música'],
                    news: ['noticia', 'política', 'economía', 'internacional', 'sociedad', 'cultura', 'deportes']
                };

                const tokens = this.tokenize(text);
                const scores = {};

                Object.entries(categories).forEach(([category, keywords]) => {
                    scores[category] = keywords.reduce((score, keyword) => {
                        return score + (tokens.includes(keyword) ? 1 : 0);
                    }, 0);
                });

                const maxScore = Math.max(...Object.values(scores));
                const predictedCategory = Object.keys(scores).find(cat => scores[cat] === maxScore);

                return {
                    category: predictedCategory,
                    confidence: maxScore / tokens.length,
                    scores
                };
            },

            // Complete text analysis
            analyzeText(text) {
                return {
                    originalText: text,
                    processedText: this.preprocessText(text),
                    tokens: this.tokenize(text),
                    wordCount: text.split(/\s+/).length,
                    characterCount: text.length,
                    sentiment: this.analyzeSentiment(text),
                    summary: this.summarizeText(text),
                    wordFrequency: this.getWordFrequency(text),
                    entities: this.extractEntities(text),
                    classification: this.classifyText(text),
                    readabilityScore: this.calculateReadability(text)
                };
            },

            // Readability score (simplified)
            calculateReadability(text) {
                const sentences = text.split(/[.!?]+/).length;
                const words = text.split(/\s+/).length;
                const characters = text.replace(/\s/g, '').length;
                
                const avgWordsPerSentence = words / sentences;
                const avgCharsPerWord = characters / words;
                
                // Simplified readability formula
                const score = 100 - (avgWordsPerSentence * 1.5) - (avgCharsPerWord * 2);
                
                return {
                    score: Math.max(0, Math.min(100, score)),
                    level: score > 80 ? 'Fácil' : score > 60 ? 'Medio' : score > 40 ? 'Difícil' : 'Muy Difícil'
                };
            }
        };

        // Expose to global for demo
        window.NLPProcessor = nlpProcessor;
    }

    // Demo interface functions
    static runEmailDemo() {
        console.log('🔧 Email Processor Demo');
        const results = window.EmailProcessor.processEmails();
        console.table(results.processed);
        return results;
    }

    static runDataAnalysisDemo() {
        console.log('📊 Data Analysis Demo');
        const mockData = window.DataAnalysisToolkit.generateMockData(50);
        const analysis = window.DataAnalysisToolkit.analyzeProjectData(mockData);
        console.log('Analysis Results:', analysis);
        return analysis;
    }

    static runNLPDemo(text = "Este es un proyecto excelente de análisis de datos con JavaScript. La implementación es fantástica y funciona perfectamente en GitHub Pages.") {
        console.log('🔤 NLP Processor Demo');
        const results = window.NLPProcessor.analyzeText(text);
        console.log('NLP Results:', results);
        return results;
    }
}

// Initialize demos
document.addEventListener('DOMContentLoaded', () => {
    new JavaScriptDemos();
});

// Export for demo testing
window.JavaScriptDemos = JavaScriptDemos;
