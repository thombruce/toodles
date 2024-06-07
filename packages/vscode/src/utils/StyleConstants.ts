import colors from './colors';

export default class StyleConstants {
  // Priorities
  public static readonly PRIORITY_DARK = colors['violet']['200'];
  public static readonly PRIORITY_LIGHT = colors['violet']['900'];

  // Dates
  public static readonly DATE_COMPLETED_DARK = colors['lime']['200'];
  public static readonly DATE_COMPLETED_LIGHT = colors['lime']['900'];
  public static readonly DATE_CREATED_DARK = colors['cyan']['200'];
  public static readonly DATE_CREATED_LIGHT = colors['cyan']['900'];
  public static readonly DATE_DUE_DARK = colors['yellow']['200'];
  public static readonly DATE_DUE_LIGHT = colors['yellow']['900'];
  public static readonly DATE_GENERIC_DARK = colors['indigo']['200'];
  public static readonly DATE_GENERIC_LIGHT = colors['indigo']['900'];

  // Context
  public static readonly CONTEXT_DARK = colors['lime']['200'];
  public static readonly CONTEXT_LIGHT = colors['lime']['900'];

  // Project
  public static readonly PROJECT_DARK = colors['blue']['200'];
  public static readonly PROJECT_LIGHT = colors['blue']['900'];

  // Tag
  public static readonly TAG_DARK = colors['grape']['200'];
  public static readonly TAG_LIGHT = colors['grape']['900'];

  // Hashtag
  public static readonly HASHTAG_DARK = colors['orange']['200'];
  public static readonly HASHTAG_LIGHT = colors['orange']['900'];

  // Prices
  public static readonly PRICE_DARK = colors['green']['200'];
  public static readonly PRICE_LIGHT = colors['green']['900'];

  // Status
  public static readonly FOCUSED_DARK = colors['gray']['200'];
  public static readonly FOCUSED_LIGHT = colors['gray']['900'];
  public static readonly COMPLETED_CSS = 'font-style: italic; text-decoration: line-through; opacity: 0.5;';
  public static readonly OBSOLETED_CSS = 'font-style: italic; opacity: 0.4;';
}
