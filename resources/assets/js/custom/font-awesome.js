import { dom, library } from '@fortawesome/fontawesome-svg-core';
import {
  faCheck,
  faCircle,
  faExclamationTriangle,
  faHistory,
  faInfoCircle,
  faShieldAlt,
  faTimesCircle,
} from '@fortawesome/free-solid-svg-icons';
import { faGithub } from '@fortawesome/free-brands-svg-icons';

const icons = {
  faShieldAlt,
  faCircle,
  faGithub,
  faHistory,
  faCheck,
  faInfoCircle,
  faExclamationTriangle,
  faTimesCircle,
};

library.add(...Object.values(icons));

dom.watch();
