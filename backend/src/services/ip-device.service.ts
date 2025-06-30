import { Request } from "express";
import { UAParser } from "ua-parser-js";

const getIpfromHeader = (header: string | string[] | undefined) => {
  return typeof header === "string"
    ? header.split(",")[0]
    : Array.isArray(header)
    ? header[0]
    : undefined;
};

// Get IP address
const getClientIP = async (req: Request) => {
  const ip =
    getIpfromHeader(req.headers["x-forwarded-for"]) ||
    req.socket.remoteAddress ||
    req.ip ||
    getIpfromHeader(req.headers["x-real-ip"]) ||
    getIpfromHeader(req.headers["x-client-ip"]) ||
    getIpfromHeader(req.headers["fastly-client-ip"]) ||
    getIpfromHeader(req.headers["true-client-ip"]) ||
    getIpfromHeader(req.headers["cf-connecting-ip"]) ||
    getIpfromHeader(req.headers["x-cluster-client-ip"]);

  if (ip === "::1") return "127.0.0.1";

  return ip || "";
};

// Get Device Information
const getDeviceInfo = async (ua: string) => {
  const parser = new UAParser(ua);
  const device = parser.getDevice();
  const os = parser.getOS();
  const browser = parser.getBrowser();

  return {
    device: device.vendor || device.model || "Unknown",
    os: os.name || os.version || "Unknown",
    browser: browser.name || browser.version || "Unknown",
  };
};

// Is Mobile
const isMobile = async (ua: string) => {
  const parser = new UAParser(ua);
  const device = await parser.getDevice().withFeatureCheck();
  const isMobile =
    device.type === "mobile" ||
    device.type === "tablet" ||
    device.type === "smarttv";

  return isMobile;
};

export { getClientIP, getDeviceInfo, isMobile };
