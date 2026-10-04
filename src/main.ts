import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap-icons/font/bootstrap-icons.css';
import Modal from 'bootstrap/js/dist/modal';

import './styles/main.css';

import heroImage from './assets/img/hero-comprimida.jpg';

import { PROJECTS } from './data/projects';
import type { CommercialProject } from './data/projects';

const heroImageElement =
  document.getElementById('hero-image') as HTMLImageElement | null;

const projectsGrid =
  document.getElementById('projects-grid') as HTMLDivElement | null;

const projectCount =
  document.getElementById('project-count') as HTMLSpanElement | null;

const contactForm =
  document.getElementById('contact-form') as HTMLFormElement | null;

const modalElement =
  document.getElementById('previewModal') as HTMLElement | null;

const modalTitle =
  document.getElementById('previewModalLabel') as HTMLElement | null;

const modalCategory =
  document.getElementById('modalCategory') as HTMLElement | null;

const modalIframe =
  document.getElementById('previewIframe') as HTMLIFrameElement | null;

const modalExternalLink =
  document.getElementById('modalExternalLink') as HTMLAnchorElement | null;

function renderProjects(
  projects: CommercialProject[]
): void {
  if (!projectsGrid) {
    return;
  }

  projectsGrid.innerHTML = '';

  if (projectCount) {
    projectCount.textContent =
      `${projects.length} proyectos`;
  }

  if (projects.length === 0) {
    projectsGrid.innerHTML = `
      <div class="col-12">
        <div class="alert alert-secondary text-center mb-0">
          No hay proyectos disponibles actualmente.
        </div>
      </div>
    `;

    return;
  }

  projects.forEach((project) => {
    const card =
      document.createElement('div');

    card.className = 'col';

    card.innerHTML = `
      <article class="card h-100">

        <div class="position-relative">
          <img
            src="${project.previewImage}"
            alt="${project.title}"
            class="card-img-top object-fit-cover"
            style="height: 220px;"
            loading="lazy"
          />
        </div>

        <div class="card-body d-flex flex-column p-4">

          <span
            class="
              badge
              bg-primary-subtle
              text-primary
              border
              border-primary-subtle
              align-self-start
              mb-2
            "
          >
            ${project.category}
          </span>

          <h3 class="card-title">
            ${project.title}
          </h3>

          <p class="card-text mb-3">
            ${project.description}
          </p>

          ${project.highlightFeature
        ? `
                <div class="small text-secondary mb-3">
                  <i
                    class="bi bi-check-circle-fill text-success me-1"
                    aria-hidden="true"
                  ></i>

                  ${project.highlightFeature}
                </div>
              `
        : ''
      }

          <div class="mt-auto d-flex flex-wrap gap-2">

            <button
              type="button"
              class="btn btn-primary btn-sm preview-project"
              data-project-id="${project.id}"
            >
              <i
                class="bi bi-eye me-1"
                aria-hidden="true"
              ></i>

              Vista Previa
            </button>

            <a
              href="${project.internalPath}"
              target="_blank"
              rel="noopener noreferrer"
              class="btn btn-outline-secondary btn-sm"
            >
              <i
                class="bi bi-box-arrow-up-right me-1"
                aria-hidden="true"
              ></i>

              Visitar
            </a>

          </div>

        </div>

      </article>
    `;

    projectsGrid.appendChild(card);
  });

  setupPreviewButtons();
}

function setupPreviewButtons(): void {
  if (!projectsGrid) {
    return;
  }

  const previewButtons =
    projectsGrid.querySelectorAll<HTMLButtonElement>(
      '.preview-project'
    );

  previewButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const projectId =
        button.dataset.projectId;

      if (!projectId) {
        return;
      }

      const project =
        PROJECTS.find(
          (item) => item.id === projectId
        );

      if (!project) {
        return;
      }

      openProjectPreview(project);
    });
  });
}

function openProjectPreview(
  project: CommercialProject
): void {
  if (!modalElement) {
    return;
  }

  if (modalTitle) {
    modalTitle.textContent =
      project.title;
  }

  if (modalCategory) {
    modalCategory.textContent =
      project.category;
  }

  if (modalIframe) {
    modalIframe.src =
      project.internalPath;
  }

  if (modalExternalLink) {
    modalExternalLink.href =
      project.internalPath;
  }

  const bootstrapModal =
    Modal.getOrCreateInstance(
      modalElement
    );

  bootstrapModal.show();
}

function setupModalCleanup(): void {
  if (!modalElement || !modalIframe) {
    return;
  }

  modalElement.addEventListener(
    'hidden.bs.modal',
    () => {
      modalIframe.src = '';
    }
  );
}

function setupContactForm(): void {
  if (!contactForm) {
    return;
  }

  contactForm.addEventListener(
    'submit',
    async (event) => {
      event.preventDefault();

      const submitButton =
        contactForm.querySelector<HTMLButtonElement>(
          'button[type="submit"]'
        );

      if (!submitButton) {
        return;
      }

      const originalButtonContent =
        submitButton.innerHTML;

      submitButton.disabled = true;

      submitButton.innerHTML = `
        <span
          class="spinner-border spinner-border-sm me-2"
          aria-hidden="true"
        ></span>

        Enviando...
      `;

      try {
        const formData =
          new FormData(contactForm);

        const response =
          await fetch(
            contactForm.action,
            {
              method: 'POST',
              body: formData,
              headers: {
                Accept: 'application/json',
              },
            }
          );

        const result =
          await response.json();

        if (
          !response.ok ||
          !result.success
        ) {
          throw new Error(
            result.message ||
            'No se pudo enviar el formulario.'
          );
        }

        showFormAlert(
          'success',
          'Mensaje enviado correctamente. Nos pondremos en contacto contigo pronto.'
        );

        contactForm.reset();

      } catch {
        showFormAlert(
          'danger',
          'No se pudo enviar el mensaje. Inténtalo nuevamente.'
        );

      } finally {
        submitButton.disabled = false;

        submitButton.innerHTML =
          originalButtonContent;
      }
    }
  );
}

function showFormAlert(
  type: 'success' | 'danger',
  message: string
): void {
  if (!contactForm) {
    return;
  }

  const existingAlert =
    contactForm.querySelector(
      '.form-alert'
    );

  existingAlert?.remove();

  const alert =
    document.createElement('div');

  alert.className =
    `alert alert-${type} form-alert mt-3 mb-0`;

  alert.setAttribute(
    'role',
    'alert'
  );

  alert.textContent = message;

  contactForm.appendChild(alert);
}

function initializeApp(): void {
  if (heroImageElement) {
    heroImageElement.src = heroImage;
  }

  renderProjects(PROJECTS);
  setupContactForm();
  setupModalCleanup();
}

if (
  document.readyState === 'loading'
) {
  document.addEventListener(
    'DOMContentLoaded',
    initializeApp
  );
} else {
  initializeApp();
}