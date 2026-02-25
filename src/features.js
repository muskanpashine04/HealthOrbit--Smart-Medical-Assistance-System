// Features JavaScript - Additional functionality for Med-Aids

document.addEventListener('DOMContentLoaded', function() {
    // Initialize all features
    initSosEmergency();
    initSearchAndFilter();
    initMedicineReminders();
    initDietGuidance();
    initEmergencyResponse();
    initContactDirectory();
    initCaregiverSupport();
    initAddToHomeScreen();
    initMapIntegration();
    initYogaMeditation();
    initDownloadInstructions();
});

// SOS Emergency Call Function
function initSosEmergency() {
    // Create SOS button
    const sosButton = document.createElement('div');
    sosButton.className = 'sos-button';
    sosButton.innerHTML = '<i class="fas fa-phone"></i>';
    document.body.appendChild(sosButton);

    // Create SOS modal
    const sosModal = document.createElement('div');
    sosModal.className = 'sos-modal';
    sosModal.innerHTML = `
        <div class="sos-modal-content">
            <span class="sos-modal-close">&times;</span>
            <div class="sos-modal-header">
                <i class="fas fa-exclamation-triangle"></i>
                <h2>Emergency Assistance</h2>
            </div>
            <div class="sos-contact-list">
                <div class="sos-contact-item">
                    <div class="sos-contact-icon">
                        <i class="fas fa-ambulance"></i>
                    </div>
                    <div class="sos-contact-info">
                        <h3>Emergency Services</h3>
                        <p>Call for immediate medical assistance</p>
                    </div>
                    <div class="sos-contact-action">
                        <button class="sos-call-btn" data-number="911"><i class="fas fa-phone"></i></button>
                    </div>
                </div>
                <div class="sos-contact-item">
                    <div class="sos-contact-icon">
                        <i class="fas fa-hospital"></i>
                    </div>
                    <div class="sos-contact-info">
                        <h3>Med-Aids Emergency</h3>
                        <p>Our 24/7 emergency hotline</p>
                    </div>
                    <div class="sos-contact-action">
                        <button class="sos-call-btn" data-number="+15559111234"><i class="fas fa-phone"></i></button>
                        <button class="sos-message-btn" data-number="+15559111234"><i class="fas fa-comment"></i></button>
                    </div>
                </div>
                <div class="sos-contact-item">
                    <div class="sos-contact-icon">
                        <i class="fas fa-user-md"></i>
                    </div>
                    <div class="sos-contact-info">
                        <h3>Primary Doctor</h3>
                        <p>Dr. Sarah Johnson</p>
                    </div>
                    <div class="sos-contact-action">
                        <button class="sos-call-btn" data-number="+15551234567"><i class="fas fa-phone"></i></button>
                        <button class="sos-message-btn" data-number="+15551234567"><i class="fas fa-comment"></i></button>
                    </div>
                </div>
            </div>
            <div class="sos-actions">
                <button class="sos-emergency-btn"><i class="fas fa-ambulance"></i> Call Emergency</button>
                <button class="sos-locate-btn"><i class="fas fa-map-marker-alt"></i> Share Location</button>
            </div>
        </div>
    `;
    document.body.appendChild(sosModal);

    // Event listeners
    sosButton.addEventListener('click', function() {
        sosModal.style.display = 'flex';
    });

    const closeBtn = sosModal.querySelector('.sos-modal-close');
    closeBtn.addEventListener('click', function() {
        sosModal.style.display = 'none';
    });

    // Close modal when clicking outside
    sosModal.addEventListener('click', function(e) {
        if (e.target === sosModal) {
            sosModal.style.display = 'none';
        }
    });

    // Call buttons functionality
    const callBtns = sosModal.querySelectorAll('.sos-call-btn');
    callBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            window.location.href = `tel:${number}`;
        });
    });

    // Message buttons functionality
    const messageBtns = sosModal.querySelectorAll('.sos-message-btn');
    messageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const number = this.getAttribute('data-number');
            window.location.href = `sms:${number}`;
        });
    });

    // Emergency button
    const emergencyBtn = sosModal.querySelector('.sos-emergency-btn');
    emergencyBtn.addEventListener('click', function() {
        window.location.href = 'tel:911';
    });

    // Share location button
    const locateBtn = sosModal.querySelector('.sos-locate-btn');
    locateBtn.addEventListener('click', function() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function(position) {
                const latitude = position.coords.latitude;
                const longitude = position.coords.longitude;
                const mapUrl = `https://www.google.com/maps?q=${latitude},${longitude}`;
                
                // Create a shareable message with location
                const shareMessage = `Emergency! I need help. My location: ${mapUrl}`;
                
                // Try to use Web Share API if available
                if (navigator.share) {
                    navigator.share({
                        title: 'Emergency - My Location',
                        text: shareMessage,
                        url: mapUrl
                    }).catch(err => {
                        console.error('Share failed:', err);
                        // Fallback - open the map
                        window.open(mapUrl, '_blank');
                    });
                } else {
                    // Fallback - open the map
                    window.open(mapUrl, '_blank');
                }
            });
        } else {
            alert('Geolocation is not supported by your browser');
        }
    });
}

// Search and Filter functionality
function initSearchAndFilter() {
    // Find sections that should have search functionality
    const searchableSections = document.querySelectorAll('.services-detailed, .testimonials-page, .wellness-section');
    
    searchableSections.forEach(section => {
        // Create search container
        const searchContainer = document.createElement('div');
        searchContainer.className = 'search-container';
        searchContainer.innerHTML = `
            <i class="fas fa-search search-icon"></i>
            <input type="text" class="search-input" placeholder="Search...">
        `;
        
        // Add filter buttons if this is the services section
        if (section.classList.contains('services-detailed')) {
            const filterContainer = document.createElement('div');
            filterContainer.className = 'filter-container';
            filterContainer.innerHTML = `
                <button class="filter-button active" data-filter="all">All</button>
                <button class="filter-button" data-filter="primary">Primary Care</button>
                <button class="filter-button" data-filter="specialized">Specialized</button>
                <button class="filter-button" data-filter="emergency">Emergency</button>
                <button class="filter-button" data-filter="telemedicine">Telemedicine</button>
            `;
            
            // Insert search and filter at the beginning of the section
            section.querySelector('.container').insertBefore(filterContainer, section.querySelector('.container').firstChild);
            section.querySelector('.container').insertBefore(searchContainer, section.querySelector('.container').firstChild);
            
            // Filter functionality
            const filterButtons = filterContainer.querySelectorAll('.filter-button');
            const serviceItems = section.querySelectorAll('.service-detailed-item');
            
            filterButtons.forEach(button => {
                button.addEventListener('click', function() {
                    // Remove active class from all buttons
                    filterButtons.forEach(btn => btn.classList.remove('active'));
                    // Add active class to clicked button
                    this.classList.add('active');
                    
                    const filter = this.getAttribute('data-filter');
                    
                    serviceItems.forEach(item => {
                        if (filter === 'all') {
                            item.style.display = 'grid';
                        } else {
                            const title = item.querySelector('h2').textContent.toLowerCase();
                            if (title.includes(filter)) {
                                item.style.display = 'grid';
                            } else {
                                item.style.display = 'none';
                            }
                        }
                    });
                });
            });
            
            // Search functionality
            const searchInput = searchContainer.querySelector('.search-input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                serviceItems.forEach(item => {
                    const title = item.querySelector('h2').textContent.toLowerCase();
                    const content = item.querySelector('.service-detailed-content').textContent.toLowerCase();
                    
                    if (title.includes(searchTerm) || content.includes(searchTerm)) {
                        item.style.display = 'grid';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        } else {
            // For other sections, just add search
            section.querySelector('.container').insertBefore(searchContainer, section.querySelector('.container').firstChild);
            
            // Search functionality for testimonials or wellness
            const searchInput = searchContainer.querySelector('.search-input');
            searchInput.addEventListener('input', function() {
                const searchTerm = this.value.toLowerCase();
                
                if (section.classList.contains('testimonials-page')) {
                    const testimonials = section.querySelectorAll('.testimonial-card, .featured-testimonial');
                    testimonials.forEach(testimonial => {
                        const content = testimonial.textContent.toLowerCase();
                        if (content.includes(searchTerm)) {
                            testimonial.style.display = 'block';
                        } else {
                            testimonial.style.display = 'none';
                        }
                    });
                } else if (section.classList.contains('wellness-section')) {
                    const wellnessCards = section.querySelectorAll('.wellness-card');
                    wellnessCards.forEach(card => {
                        const content = card.textContent.toLowerCase();
                        if (content.includes(searchTerm)) {
                            card.style.display = 'block';
                        } else {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        }
    });
}

// Medicine Reminders
function initMedicineReminders() {
    // Check if we're on a page that should have medicine reminders
    const mainContent = document.querySelector('main') || document.querySelector('.page-header').nextElementSibling;
    
    if (mainContent) {
        // Create medicine reminder section
        const reminderSection = document.createElement('section');
        reminderSection.className = 'medicine-reminders';
        reminderSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Medicine Reminders</h2>
                    <p>Never miss your medication with our reminder system</p>
                </div>
                <div class="reminder-container">
                    <div class="reminder-header">
                        <h3>Your Medication Schedule</h3>
                        <button class="reminder-add-btn"><i class="fas fa-plus"></i></button>
                    </div>
                    <div class="reminder-list">
                        <div class="reminder-item">
                            <input type="checkbox" class="reminder-checkbox">
                            <div class="reminder-info">
                                <h4>Lisinopril</h4>
                                <p>Blood pressure medication</p>
                            </div>
                            <span class="reminder-time">8:00 AM</span>
                            <div class="reminder-actions">
                                <button class="reminder-edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="reminder-delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <div class="reminder-item">
                            <input type="checkbox" class="reminder-checkbox">
                            <div class="reminder-info">
                                <h4>Metformin</h4>
                                <p>Diabetes medication</p>
                            </div>
                            <span class="reminder-time">1:00 PM</span>
                            <div class="reminder-actions">
                                <button class="reminder-edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="reminder-delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                        <div class="reminder-item">
                            <input type="checkbox" class="reminder-checkbox">
                            <div class="reminder-info">
                                <h4>Atorvastatin</h4>
                                <p>Cholesterol medication</p>
                            </div>
                            <span class="reminder-time">8:00 PM</span>
                            <div class="reminder-actions">
                                <button class="reminder-edit-btn"><i class="fas fa-edit"></i></button>
                                <button class="reminder-delete-btn"><i class="fas fa-trash"></i></button>
                            </div>
                        </div>
                    </div>
                    <div class="reminder-form" style="display: none;">
                        <h4>Add/Edit Medication</h4>
                        <form id="medication-form">
                            <div class="form-group">
                                <label for="med-name">Medication Name</label>
                                <input type="text" id="med-name" required>
                            </div>
                            <div class="form-group">
                                <label for="med-desc">Description</label>
                                <input type="text" id="med-desc">
                            </div>
                            <div class="form-group">
                                <label for="med-time">Time</label>
                                <input type="time" id="med-time" required>
                            </div>
                            <div class="form-group">
                                <label for="med-repeat">Repeat</label>
                                <select id="med-repeat">
                                    <option value="daily">Daily</option>
                                    <option value="weekdays">Weekdays</option>
                                    <option value="weekends">Weekends</option>
                                    <option value="custom">Custom</option>
                                </select>
                            </div>
                            <div class="form-group">
                                <button type="submit" class="btn btn-primary">Save</button>
                                <button type="button" class="btn btn-secondary cancel-btn">Cancel</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after the main content
        const referenceNode = document.querySelector('.cta-section') || document.querySelector('footer');
        referenceNode.parentNode.insertBefore(reminderSection, referenceNode);
        
        // Add event listeners
        const addBtn = reminderSection.querySelector('.reminder-add-btn');
        const reminderForm = reminderSection.querySelector('.reminder-form');
        const cancelBtn = reminderSection.querySelector('.cancel-btn');
        const medicationForm = reminderSection.querySelector('#medication-form');
        
        addBtn.addEventListener('click', function() {
            reminderForm.style.display = 'block';
        });
        
        cancelBtn.addEventListener('click', function() {
            reminderForm.style.display = 'none';
        });
        
        medicationForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const medName = document.getElementById('med-name').value;
            const medDesc = document.getElementById('med-desc').value;
            const medTime = document.getElementById('med-time').value;
            
            // Format time for display
            const timeObj = new Date(`2000-01-01T${medTime}`);
            const formattedTime = timeObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
            
            // Create new reminder item
            const newItem = document.createElement('div');
            newItem.className = 'reminder-item';
            newItem.innerHTML = `
                <input type="checkbox" class="reminder-checkbox">
                <div class="reminder-info">
                    <h4>${medName}</h4>
                    <p>${medDesc}</p>
                </div>
                <span class="reminder-time">${formattedTime}</span>
                <div class="reminder-actions">
                    <button class="reminder-edit-btn"><i class="fas fa-edit"></i></button>
                    <button class="reminder-delete-btn"><i class="fas fa-trash"></i></button>
                </div>
            `;
            
            // Add to reminder list
            const reminderList = reminderSection.querySelector('.reminder-list');
            reminderList.appendChild(newItem);
            
            // Reset form and hide
            medicationForm.reset();
            reminderForm.style.display = 'none';
            
            // Add event listeners to new buttons
            const editBtn = newItem.querySelector('.reminder-edit-btn');
            const deleteBtn = newItem.querySelector('.reminder-delete-btn');
            
            editBtn.addEventListener('click', function() {
                // Populate form with current values
                document.getElementById('med-name').value = newItem.querySelector('h4').textContent;
                document.getElementById('med-desc').value = newItem.querySelector('p').textContent;
                
                // Show form
                reminderForm.style.display = 'block';
                
                // Remove the item (it will be replaced when form is submitted)
                newItem.remove();
            });
            
            deleteBtn.addEventListener('click', function() {
                newItem.remove();
            });
        });
        
        // Add event listeners to existing edit and delete buttons
        const editBtns = reminderSection.querySelectorAll('.reminder-edit-btn');
        const deleteBtns = reminderSection.querySelectorAll('.reminder-delete-btn');
        
        editBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.reminder-item');
                
                // Populate form with current values
                document.getElementById('med-name').value = item.querySelector('h4').textContent;
                document.getElementById('med-desc').value = item.querySelector('p').textContent;
                
                // Show form
                reminderForm.style.display = 'block';
                
                // Remove the item (it will be replaced when form is submitted)
                item.remove();
            });
        });
        
        deleteBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const item = this.closest('.reminder-item');
                item.remove();
            });
        });
    }
}

// Diet Guidance
function initDietGuidance() {
    // Check if we're on a page that should have diet guidance
    const servicesSection = document.querySelector('.services-detailed');
    
    if (servicesSection) {
        // Create diet guidance section
        const dietSection = document.createElement('section');
        dietSection.className = 'diet-guidance';
        dietSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Diet Guidance</h2>
                    <p>Personalized nutrition plans for your health needs</p>
                </div>
                <div class="diet-card">
                    <div class="diet-card-header">
                        <h3>Heart-Healthy Diet Plan</h3>
                    </div>
                    <div class="diet-card-content">
                        <div class="diet-meal">
                            <h4><i class="fas fa-sun"></i> Breakfast</h4>
                            <p>Start your day with a nutritious meal rich in fiber and low in saturated fats.</p>
                            <ul>
                                <li>Oatmeal with berries and nuts</li>
                                <li>Whole grain toast with avocado</li>
                                <li>Greek yogurt with honey</li>
                                <li>Green tea or fresh fruit juice</li>
                            </ul>
                        </div>
                        <div class="diet-meal">
                            <h4><i class="fas fa-cloud-sun"></i> Lunch</h4>
                            <p>Focus on lean proteins and plenty of vegetables for your midday meal.</p>
                            <ul>
                                <li>Grilled chicken or fish salad</li>
                                <li>Quinoa bowl with vegetables</li>
                                <li>Lentil soup with whole grain bread</li>
                                <li>Water with lemon or herbal tea</li>
                            </ul>
                        </div>
                        <div class="diet-meal">
                            <h4><i class="fas fa-moon"></i> Dinner</h4>
                            <p>Keep dinner light but satisfying with a balance of proteins and complex carbohydrates.</p>
                            <ul>
                                <li>Baked salmon with steamed vegetables</li>
                                <li>Vegetable stir-fry with tofu</li>
                                <li>Turkey breast with sweet potatoes</li>
                                <li>Herbal tea or water</li>
                            </ul>
                        </div>
                        <div class="diet-meal">
                            <h4><i class="fas fa-apple-alt"></i> Snacks</h4>
                            <p>Healthy snacks between meals can help maintain energy levels and prevent overeating.</p>
                            <ul>
                                <li>Fresh fruits (apples, bananas, berries)</li>
                                <li>Handful of unsalted nuts</li>
                                <li>Carrot sticks with hummus</li>
                                <li>Greek yogurt with honey</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <p class="text-center" style="margin-top: 20px;">
                    <a href="#" class="btn btn-primary">Get Personalized Diet Plan</a>
                </p>
            </div>
        `;
        
        // Insert before the CTA section
        const ctaSection = document.querySelector('.cta-section');
        ctaSection.parentNode.insertBefore(dietSection, ctaSection);
    }
}

// Emergency Response
function initEmergencyResponse() {
    // Check if we're on the services page
    const servicesSection = document.querySelector('.services-detailed');
    
    if (servicesSection) {
        // Create emergency response section
        const emergencySection = document.createElement('section');
        emergencySection.className = 'emergency-response';
        emergencySection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Emergency Response Guide</h2>
                    <p>Know what to do in critical situations</p>
                </div>
                <div class="emergency-card">
                    <div class="emergency-card-header">
                        <i class="fas fa-heartbeat"></i>
                        <h3>Heart Attack Response</h3>
                    </div>
                    <div class="emergency-card-content">
                        <p>Recognizing the signs of a heart attack and taking immediate action can save lives. Common symptoms include chest pain, shortness of breath, and discomfort in other areas of the upper body.</p>
                        <div class="emergency-video">
                            <img src="../assests/heart.jpg" alt="Heart Attack Response Video" style="width:100%; height:auto; background-color:#f0f0f0; display:flex; align-items:center; justify-content:center;">
                            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:50px; color:#1a73e8;">
                            </div>
                        </div>
                        <div class="emergency-dos-donts">
                            <div class="emergency-dos">
                                <h4><i class="fas fa-check-circle"></i> Do's</h4>
                                <ul>
                                    <li>Call emergency services (911) immediately</li>
                                    <li>Have the person sit or lie down in a comfortable position</li>
                                    <li>Loosen any tight clothing</li>
                                    <li>If the person is not allergic to aspirin, have them chew one adult aspirin</li>
                                    <li>Begin CPR if the person becomes unconscious and doesn't have a pulse</li>
                                </ul>
                            </div>
                            <div class="emergency-donts">
                                <h4><i class="fas fa-times-circle"></i> Don'ts</h4>
                                <ul>
                                    <li>Don't wait to see if symptoms go away</li>
                                    <li>Don't let the person drive themselves to the hospital</li>
                                    <li>Don't give the person anything to eat or drink other than aspirin</li>
                                    <li>Don't leave the person alone</li>
                                    <li>Don't panic - stay calm and reassuring</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="emergency-card">
                    <div class="emergency-card-header">
                        <i class="fas fa-brain"></i>
                        <h3>Stroke Response</h3>
                    </div>
                    <div class="emergency-card-content">
                        <p>Time is critical when someone is having a stroke. Remember the acronym FAST: Face drooping, Arm weakness, Speech difficulties, Time to call emergency services.</p>
                        <div class="emergency-video">
                            <img src="../assests/stroke.jpg" alt="Heart Attack Response Video" style="width:100%; height:400px; background-color:#f0f0f0; display:flex; align-items:center; justify-content:center;">
                            <div style="position:absolute; top:50%; left:50%; transform:translate(-50%, -50%); font-size:50px; color:#1a73e8;">
                            </div>
                        </div>
                        <div class="emergency-dos-donts">
                            <div class="emergency-dos">
                                <h4><i class="fas fa-check-circle"></i> Do's</h4>
                                <ul>
                                    <li>Call emergency services (911) immediately</li>
                                    <li>Note the time when symptoms first appeared</li>
                                    <li>Have the person lie down with their head slightly elevated</li>
                                    <li>Keep checking their breathing and pulse</li>
                                    <li>Talk to the person reassuringly</li>
                                </ul>
                            </div>
                            <div class="emergency-donts">
                                <h4><i class="fas fa-times-circle"></i> Don'ts</h4>
                                <ul>
                                    <li>Don't give the person anything to eat or drink</li>
                                    <li>Don't give aspirin or other medications</li>
                                    <li>Don't let the person go to sleep</li>
                                    <li>Don't drive the person to the hospital yourself</li>
                                    <li>Don't delay seeking medical help</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before the CTA section
        const ctaSection = document.querySelector('.cta-section');
        ctaSection.parentNode.insertBefore(emergencySection, ctaSection);
    }
}

// Contact Directory
function initContactDirectory() {
    // Check if we're on the contact page
    const contactPage = document.querySelector('.contact-page');
    
    if (contactPage) {
        // Create contact directory section
        const directorySection = document.createElement('section');
        directorySection.className = 'contact-directory';
        directorySection.innerHTML = `
            <div class="container">
                <div class="directory-header">
                    <h2>Contact Directory</h2>
                    <button class="directory-add-btn"><i class="fas fa-plus"></i> Add Contact</button>
                </div>
                <div class="directory-grid">
                    <div class="directory-card">
                        <div class="directory-card-header">
                            <div class="avatar">
                                <i class="fas fa-user-md"></i>
                            </div>
                            <h3>Dr. Sarah Johnson</h3>
                            <p>Primary Care Physician</p>
                        </div>
                        <div class="directory-card-content">
                            <div class="directory-contact-info">
                                <div class="directory-contact-item">
                                    <i class="fas fa-phone"></i>
                                    <p>+1 (555) 123-4567</p>
                                </div>
                                <div class="directory-contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <p>dr.johnson@med-aids.com</p>
                                </div>
                                <div class="directory-contact-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <p>123 Healthcare Ave, Medical District</p>
                                </div>
                            </div>
                            <div class="directory-card-actions">
                                <button class="directory-call-btn"><i class="fas fa-phone"></i> Call</button>
                                <button class="directory-message-btn"><i class="fas fa-comment"></i> Message</button>
                            </div>
                        </div>
                    </div>
                    <div class="directory-card">
                        <div class="directory-card-header">
                            <div class="avatar">
                                <i class="fas fa-user-nurse"></i>
                            </div>
                            <h3>Nurse Michael Chen</h3>
                            <p>Emergency Department</p>
                        </div>
                        <div class="directory-card-content">
                            <div class="directory-contact-info">
                                <div class="directory-contact-item">
                                    <i class="fas fa-phone"></i>
                                    <p>+1 (555) 987-6543</p>
                                </div>
                                <div class="directory-contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <p>nurse.chen@med-aids.com</p>
                                </div>
                                <div class="directory-contact-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <p>123 Healthcare Ave, Medical District</p>
                                </div>
                            </div>
                            <div class="directory-card-actions">
                                <button class="directory-call-btn"><i class="fas fa-phone"></i> Call</button>
                                <button class="directory-message-btn"><i class="fas fa-comment"></i> Message</button>
                            </div>
                        </div>
                    </div>
                    <div class="directory-card">
                        <div class="directory-card-header">
                            <div class="avatar">
                                <i class="fas fa-user-friends"></i>
                            </div>
                            <h3>Emily Rodriguez</h3>
                            <p>Family Member</p>
                        </div>
                        <div class="directory-card-content">
                            <div class="directory-contact-info">
                                <div class="directory-contact-item">
                                    <i class="fas fa-phone"></i>
                                    <p>+1 (555) 456-7890</p>
                                </div>
                                <div class="directory-contact-item">
                                    <i class="fas fa-envelope"></i>
                                    <p>emily.rodriguez@email.com</p>
                                </div>
                                <div class="directory-contact-item">
                                    <i class="fas fa-map-marker-alt"></i>
                                    <p>456 Family Street, Hometown</p>
                                </div>
                            </div>
                            <div class="directory-card-actions">
                                <button class="directory-call-btn"><i class="fas fa-phone"></i> Call</button>
                                <button class="directory-message-btn"><i class="fas fa-comment"></i> Message</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after the contact form section
        const contactFormSection = document.querySelector('.contact-form-section');
        contactFormSection.parentNode.insertBefore(directorySection, contactFormSection.nextSibling);
        
        // Add event listeners
        const callBtns = directorySection.querySelectorAll('.directory-call-btn');
        callBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const phoneElement = this.closest('.directory-card-content').querySelector('.directory-contact-item:first-child p');
                const phoneNumber = phoneElement.textContent.replace(/[^0-9+]/g, '');
                window.location.href = `tel:${phoneNumber}`;
            });
        });
        
        const messageBtns = directorySection.querySelectorAll('.directory-message-btn');
        messageBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const phoneElement = this.closest('.directory-card-content').querySelector('.directory-contact-item:first-child p');
                const phoneNumber = phoneElement.textContent.replace(/[^0-9+]/g, '');
                window.location.href = `sms:${phoneNumber}`;
            });
        });
    }
}

// Caregiver Support
function initCaregiverSupport() {
    // Check if we're on a page that should have caregiver support
    const aboutPage = document.querySelector('.about-story');
    
    if (aboutPage) {
        // Create caregiver support section
        const caregiverSection = document.createElement('section');
        caregiverSection.className = 'caregiver-support';
        caregiverSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Caregiver Support System</h2>
                    <p>Monitor and assist patients remotely with our caregiver tools</p>
                </div>
                <div class="caregiver-mode-toggle">
                    <p>Caregiver Mode:</p>
                    <label class="toggle-switch">
                        <input type="checkbox" id="caregiver-toggle">
                        <span class="toggle-slider"></span>
                    </label>
                </div>
                <div class="caregiver-dashboard" style="display: none;">
                    <h3>Patient Monitoring Dashboard</h3>
                    <div class="patient-status-grid">
                        <div class="patient-status-card">
                            <div class="patient-status-header">
                                <img src="../assests/patient1.svg" alt="John Smith">
                                <div>
                                    <h4>John Smith</h4>
                                    <p>Father</p>
                                </div>
                            </div>
                            <div class="patient-status-info">
                                <div class="status-item">
                                    <p>Medication Status:</p>
                                    <p class="status status-warning">Last dose missed</p>
                                </div>
                                <div class="status-item">
                                    <p>Last Check-in:</p>
                                    <p class="status">2 hours ago</p>
                                </div>
                                <div class="status-item">
                                    <p>Activity Level:</p>
                                    <p class="status status-good">Normal</p>
                                </div>
                            </div>
                            <div class="patient-status-actions">
                                <button class="check-in-btn">Check In Now</button>
                            </div>
                        </div>
                        <div class="patient-status-card">
                            <div class="patient-status-header">
                                <img src="../assests/patient2.svg" alt="Mary Johnson">
                                <div>
                                    <h4>Mary Johnson</h4>
                                    <p>Mother</p>
                                </div>
                            </div>
                            <div class="patient-status-info">
                                <div class="status-item">
                                    <p>Medication Status:</p>
                                    <p class="status status-good">Up to date</p>
                                </div>
                                <div class="status-item">
                                    <p>Last Check-in:</p>
                                    <p class="status">30 minutes ago</p>
                                </div>
                                <div class="status-item">
                                    <p>Activity Level:</p>
                                    <p class="status status-alert">Low</p>
                                </div>
                            </div>
                            <div class="patient-status-actions">
                                <button class="check-in-btn">Check In Now</button>
                            </div>
                        </div>
                    </div>
                    <div class="alert-history">
                        <h4>Recent Alerts</h4>
                        <div class="alert-item">
                            <div class="alert-icon emergency">
                                <i class="fas fa-exclamation-triangle"></i>
                            </div>
                            <div class="alert-info">
                                <h5>SOS Button Activated</h5>
                                <p>John Smith activated the emergency button</p>
                            </div>
                            <div class="alert-time">Today, 10:23 AM</div>
                        </div>
                        <div class="alert-item">
                            <div class="alert-icon medication">
                                <i class="fas fa-pills"></i>
                            </div>
                            <div class="alert-info">
                                <h5>Medication Missed</h5>
                                <p>John Smith missed morning medication</p>
                            </div>
                            <div class="alert-time">Today, 8:30 AM</div>
                        </div>
                        <div class="alert-item">
                            <div class="alert-icon medication">
                                <i class="fas fa-pills"></i>
                            </div>
                            <div class="alert-info">
                                <h5>Medication Reminder Sent</h5>
                                <p>Reminder sent to Mary Johnson</p>
                            </div>
                            <div class="alert-time">Yesterday, 8:00 PM</div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert after the about-mission-vision section
        const missionVisionSection = document.querySelector('.about-mission-vision');
        missionVisionSection.parentNode.insertBefore(caregiverSection, missionVisionSection.nextSibling);
        
        // Add event listeners
        const caregiverToggle = caregiverSection.querySelector('#caregiver-toggle');
        const caregiverDashboard = caregiverSection.querySelector('.caregiver-dashboard');
        
        caregiverToggle.addEventListener('change', function() {
            if (this.checked) {
                caregiverDashboard.style.display = 'block';
            } else {
                caregiverDashboard.style.display = 'none';
            }
        });
        
        const checkInBtns = caregiverSection.querySelectorAll('.check-in-btn');
        checkInBtns.forEach(btn => {
            btn.addEventListener('click', function() {
                const patientName = this.closest('.patient-status-card').querySelector('h4').textContent;
                alert(`Checking in with ${patientName}. In a real application, this would initiate a call or send a message.`);
            });
        });
    }
}

// Add to Home Screen
function initAddToHomeScreen() {
    // Create Add to Home Screen prompt
    const addToHomePrompt = document.createElement('div');
    addToHomePrompt.className = 'add-to-home';
    addToHomePrompt.innerHTML = `
        <div class="add-to-home-header">
            <i class="fas fa-mobile-alt"></i>
            <h3>Add to Home Screen</h3>
        </div>
        <p>Add Med-Aids to your home screen for quick access to emergency services and health resources.</p>
        <div class="add-to-home-actions">
            <button class="add-to-home-later">Later</button>
            <button class="add-to-home-now">Add Now</button>
        </div>
    `;
    document.body.appendChild(addToHomePrompt);
    
    // Show the prompt after 5 seconds
    setTimeout(() => {
        addToHomePrompt.style.display = 'block';
    }, 5000);
    
    // Add event listeners
    const laterBtn = addToHomePrompt.querySelector('.add-to-home-later');
    const addNowBtn = addToHomePrompt.querySelector('.add-to-home-now');
    
    laterBtn.addEventListener('click', function() {
        addToHomePrompt.style.display = 'none';
    });
    
    addNowBtn.addEventListener('click', function() {
        alert('To add to home screen: tap the share icon in your browser and select "Add to Home Screen".');
        addToHomePrompt.style.display = 'none';
    });
}

// Map Integration
function initMapIntegration() {
    // Check if we're on the contact page
    const contactMap = document.querySelector('.contact-map');
    
    if (contactMap) {
        // Update the map placeholder with interactive content
        contactMap.innerHTML = `
            <div style="width:100%; height:100%; position:relative;">
                <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.215573036704!2d-73.98784492426285!3d40.75798657138946!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5m2!1s0x89c25855c6480299%3A0x55194ec5a1ae072e!2sTimes%20Square!5e0!3m2!1sen!2sus!4v1698765432109!5m2!1sen!2sus" 
                    width="100%" 
                    height="100%" 
                    style="border:0;" 
                    allowfullscreen="" 
                    loading="lazy" 
                    referrerpolicy="no-referrer-when-downgrade">
                </iframe>
                <div style="position:absolute; bottom:20px; left:20px; z-index:10;">
                    <button class="btn btn-primary" id="find-nearby-hospitals">
                        <i class="fas fa-hospital"></i> Find Nearby Hospitals
                    </button>
                </div>
            </div>
        `;
        
        // Add event listener for the find nearby hospitals button
        const findNearbyBtn = contactMap.querySelector('#find-nearby-hospitals');
        findNearbyBtn.addEventListener('click', function() {
            // In a real application, this would use the Geolocation API and Google Maps API
            // to find and display nearby hospitals
            alert('This feature would locate nearby hospitals using your current location. For demo purposes, we\'re showing a static map.');
        });
    }
}

// Yoga and Meditation Instructions
function initYogaMeditation() {
    // Check if we're on a page that should have wellness content
    const servicesSection = document.querySelector('.services-detailed');
    
    if (servicesSection) {
        // Create wellness section
        const wellnessSection = document.createElement('section');
        wellnessSection.className = 'wellness-section';
        wellnessSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Wellness Support</h2>
                    <p>Yoga and meditation practices for your mental and physical wellbeing</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                    <div class="wellness-card">
                        <img src="../assests/service1.svg" alt="Morning Yoga Routine">
                        <div class="wellness-card-content">
                            <h3>Morning Yoga Routine</h3>
                            <p>Start your day with this energizing 15-minute yoga sequence designed to awaken your body and mind.</p>
                        </div>
                        <div class="wellness-card-footer">
                            <a href="#" class="btn-text">View Instructions <i class="fas fa-arrow-right"></i></a>
                            <div class="wellness-difficulty">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>Intermediate</span>
                            </div>
                        </div>
                    </div>
                    <div class="wellness-card">
                        <img src="../assests/service2.svg" alt="Stress Relief Meditation">
                        <div class="wellness-card-content">
                            <h3>Stress Relief Meditation</h3>
                            <p>A 10-minute guided meditation practice to help reduce stress and anxiety during your busy day.</p>
                        </div>
                        <div class="wellness-card-footer">
                            <a href="#" class="btn-text">View Instructions <i class="fas fa-arrow-right"></i></a>
                            <div class="wellness-difficulty">
                                <i class="fas fa-star"></i>
                                <i class="far fa-star"></i>
                                <i class="far fa-star"></i>
                                <span>Beginner</span>
                            </div>
                        </div>
                    </div>
                    <div class="wellness-card">
                        <img src="../assests/service3.svg" alt="Bedtime Relaxation">
                        <div class="wellness-card-content">
                            <h3>Bedtime Relaxation</h3>
                            <p>Improve your sleep quality with this 15-minute relaxation routine designed to prepare your body for rest.</p>
                        </div>
                        <div class="wellness-card-footer">
                            <a href="#" class="btn-text">View Instructions <i class="fas fa-arrow-right"></i></a>
                            <div class="wellness-difficulty">
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <i class="fas fa-star"></i>
                                <span>Advanced</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before the emergency response section or CTA section
        const emergencySection = document.querySelector('.emergency-response') || document.querySelector('.cta-section');
        emergencySection.parentNode.insertBefore(wellnessSection, emergencySection);
    }
}

// Downloadable Instructions
function initDownloadInstructions() {
    // Check if we're on a page that should have downloadable instructions
    const servicesSection = document.querySelector('.services-detailed');
    
    if (servicesSection) {
        // Create downloadable instructions section
        const downloadSection = document.createElement('section');
        downloadSection.className = 'download-instructions';
        downloadSection.innerHTML = `
            <div class="container">
                <div class="section-header">
                    <h2>Downloadable Instructions</h2>
                    <p>Access important health guides and instructions offline</p>
                </div>
                <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
                    <div class="download-card">
                        <div class="download-card-header">
                            <h3>First Aid Guide</h3>
                        </div>
                        <div class="download-card-content">
                            <p>A comprehensive guide to basic first aid procedures for common emergencies. Learn how to respond to cuts, burns, fractures, and more.</p>
                            <button class="download-button">
                                <i class="fas fa-download"></i> Download PDF
                            </button>
                        </div>
                    </div>
                    <div class="download-card">
                        <div class="download-card-header">
                            <h3>Medication Tracker</h3>
                        </div>
                        <div class="download-card-content">
                            <p>A printable medication tracking sheet to help you keep track of your prescriptions, dosages, and schedule.</p>
                            <button class="download-button">
                                <i class="fas fa-download"></i> Download PDF
                            </button>
                        </div>
                    </div>
                    <div class="download-card">
                        <div class="download-card-header">
                            <h3>Home Exercise Program</h3>
                        </div>
                        <div class="download-card-content">
                            <p>A collection of exercises you can do at home to maintain strength, flexibility, and cardiovascular health.</p>
                            <button class="download-button">
                                <i class="fas fa-download"></i> Download PDF
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Insert before the wellness section or emergency response section
        const wellnessSection = document.querySelector('.wellness-section') || document.querySelector('.emergency-response') || document.querySelector('.cta-section');
        wellnessSection.parentNode.insertBefore(downloadSection, wellnessSection);
        
        // Add event listeners for download buttons
        const downloadButtons = downloadSection.querySelectorAll('.download-button');
        downloadButtons.forEach(button => {
            button.addEventListener('click', function() {
                const documentTitle = this.closest('.download-card').querySelector('h3').textContent;
                alert(`In a real application, this would download the ${documentTitle} PDF. For demo purposes, we're showing this alert instead.`);
            });
        });
    }
}