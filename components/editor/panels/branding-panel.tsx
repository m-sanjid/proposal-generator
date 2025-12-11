"use client"

import { Trash2, Upload } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { BrandingPanelProps } from "./types"

const PRESET_COLORS = [
  "#2563eb", // Blue
  "#16a34a", // Green
  "#dc2626", // Red
  "#9333ea", // Purple
  "#f59e0b", // Amber
  "#0891b2", // Cyan
] as const

export function BrandingPanel({
  invoiceData,
  updateBranding,
  handleLogoUpload,
  fileInputRef,
}: BrandingPanelProps) {
  const { logo, themeColor } = invoiceData.branding

  return (
    <div className="space-y-4">
      {/* Logo Section */}
      <h3 className="font-semibold text-foreground">Logo</h3>
      <div className="flex flex-col items-center gap-4">
        {logo ? (
          <div className="relative">
            <img
              src={logo}
              alt="Logo preview"
              className="h-20 max-w-full object-contain"
            />
            <Button
              variant="destructive"
              size="sm"
              className="absolute -right-2 -top-2 h-6 w-6 rounded-full p-0"
              onClick={() => updateBranding({ logo: null })}
            >
              <Trash2 className="h-3 w-3" />
            </Button>
          </div>
        ) : (
          <div
            className="flex h-24 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-muted-foreground/30 transition-colors hover:border-muted-foreground/50"
            onClick={() => fileInputRef.current?.click()}
          >
            <Upload className="mb-2 h-6 w-6 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Click to upload logo</span>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleLogoUpload}
          className="hidden"
        />

        {logo && (
          <Button
            variant="outline"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Logo
          </Button>
        )}
      </div>

      {/* Theme Color Section */}
      <div className="space-y-4">
        <h3 className="font-semibold text-foreground">Theme Color</h3>
        <div className="flex items-center gap-4">
          <input
            type="color"
            value={themeColor}
            onChange={(e) => updateBranding({ themeColor: e.target.value })}
            className="h-10 w-16 cursor-pointer rounded border"
          />
          <Input
            value={themeColor}
            onChange={(e) => updateBranding({ themeColor: e.target.value })}
            className="flex-1"
          />
        </div>

        {/* Color Presets */}
        <div className="flex flex-wrap gap-2">
          {PRESET_COLORS.map((color) => (
            <button
              key={color}
              className="h-8 w-8 rounded-full border-2 border-transparent transition-all hover:scale-110 focus:border-foreground"
              style={{ backgroundColor: color }}
              onClick={() => updateBranding({ themeColor: color })}
              aria-label={`Select color ${color}`}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
