import React, { useState } from 'react';
import { Upload, Trash2, Plus, Minus, ChevronDown, ChevronUp } from 'lucide-react';

interface DocumentUpload {
  id: string;
  name: string;
  file?: File;
  uploaded: boolean;
}

interface UBOPerson {
  fullName: string;
  nationality: string;
  residentialAddress: string;
  nicPassport: string;
  controllingOwnershipInterest: string;
}

interface DocumentsUBOData {
  documents: DocumentUpload[];
  beneficialOwner: string;
  ultimateBeneficialOwner: string;
  sourceOfFunds: string;
  shareholdersSourceOfWealth: string;
  shareholdersNationalityCountry: string;
  confirmationChecked: boolean;
  uboPersons: UBOPerson[];
}

interface DocumentsUBOFormProps {
  onNext?: () => void;
  onBack?: () => void;
}

const DocumentsUBOForm: React.FC<DocumentsUBOFormProps> = ({ onNext, onBack }) => {
  const [formData, setFormData] = useState<DocumentsUBOData>({
    documents: [
      { id: '1', name: '', uploaded: false },
      { id: '2', name: '', uploaded: false },
      { id: '3', name: '', uploaded: false },
      { id: '4', name: '', uploaded: false },
      { id: '5', name: '', uploaded: false }
    ],
    beneficialOwner: '',
    ultimateBeneficialOwner: '',
    sourceOfFunds: '',
    shareholdersSourceOfWealth: '',
    shareholdersNationalityCountry: '',
    confirmationChecked: false,
    uboPersons: []
  });

  const [sectionsOpen, setSectionsOpen] = useState({
    documentsSection: false,
    uboDetailsSection: false,
    uboDeclarationSection: false,
  });

  const toggleSection = (section: keyof typeof sectionsOpen) => {
    setSectionsOpen(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const handleDocumentUpload = (index: number, file: File) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) => 
        i === index ? { ...doc, file, name: file.name, uploaded: true } : doc
      )
    }));
  };

  const handleDocumentRemove = (index: number) => {
    setFormData(prev => ({
      ...prev,
      documents: prev.documents.map((doc, i) => 
        i === index ? { ...doc, file: undefined, name: '', uploaded: false } : doc
      )
    }));
  };

  const handleInputChange = (field: keyof DocumentsUBOData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const addUBOPerson = () => {
    setFormData(prev => ({
      ...prev,
      uboPersons: [...prev.uboPersons, {
        fullName: '',
        nationality: '',
        residentialAddress: '',
        nicPassport: '',
        controllingOwnershipInterest: ''
      }]
    }));
  };

  const removeUBOPerson = (index: number) => {
    setFormData(prev => ({
      ...prev,
      uboPersons: prev.uboPersons.filter((_, i) => i !== index)
    }));
  };

  const updateUBOPerson = (index: number, field: keyof UBOPerson, value: string) => {
    setFormData(prev => ({
      ...prev,
      uboPersons: prev.uboPersons.map((person, i) => 
        i === index ? { ...person, [field]: value } : person
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <span className="text-2xl font-bold text-gray-600">BANK</span>
              <span className="text-2xl font-bold text-red-600">ONE</span>
            </div>
            <div className="text-red-600 font-semibold text-lg tracking-wide">
              CORPORATE ACCOUNT OPENING
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="mb-8">
          <p className="text-gray-600 mb-2">
            Let's get started ! You're just steps away from your business account setup
          </p>
          <p className="text-gray-400 text-sm">
            Please read your account terms and conditions
          </p>
        </div>

        <form className="space-y-8">
          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('documentsSection')}
              className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
            >
              <h2 className="text-lg font-semibold">DOCUMENTS</h2>
              {sectionsOpen.documentsSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {sectionsOpen.documentsSection && (
              <div className="p-6">
                <p className="text-gray-700 mb-6">List of document to upload</p>
                
                <div className="space-y-4">
                  {formData.documents.map((document, index) => (
                    <div key={document.id} className="flex items-center space-x-4 p-4 border border-gray-200 rounded-lg">
                      <div className="flex-1">
                        <div className="w-32 h-20 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center bg-gray-50">
                          {document.uploaded ? (
                            <div className="text-center">
                              <div className="text-xs text-gray-600 truncate max-w-28">
                                {document.name}
                              </div>
                            </div>
                          ) : (
                            <div className="text-gray-400 text-xs text-center">
                              Document<br />Preview
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        <input
                          type="text"
                          value={document.name}
                          onChange={(e) => {
                            setFormData(prev => ({
                              ...prev,
                              documents: prev.documents.map((doc, i) => 
                                i === index ? { ...doc, name: e.target.value } : doc
                              )
                            }));
                          }}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                          placeholder="Document name"
                        />
                      </div>
                      
                      <div className="flex space-x-2">
                        <label className="cursor-pointer">
                          <input
                            type="file"
                            className="hidden"
                            onChange={(e) => {
                              const file = e.target.files?.[0];
                              if (file) {
                                handleDocumentUpload(index, file);
                              }
                            }}
                            accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                          />
                          <div className="p-2 text-gray-600 hover:text-red-600 transition-colors">
                            <Upload className="w-5 h-5" />
                          </div>
                        </label>
                        
                        {document.uploaded && (
                          <button
                            type="button"
                            onClick={() => handleDocumentRemove(index)}
                            className="p-2 text-gray-600 hover:text-red-600 transition-colors"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('uboDetailsSection')}
              className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
            >
              <h2 className="text-lg font-semibold">UBO DETAILS</h2>
              {sectionsOpen.uboDetailsSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {sectionsOpen.uboDetailsSection && (
              <div className="p-6 space-y-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Beneficial Owner <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      value={formData.beneficialOwner}
                      onChange={(e) => handleInputChange('beneficialOwner', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      rows={3}
                      placeholder="Enter beneficial owner details"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Ultimate Beneficial Owner
                    </label>
                    <textarea
                      value={formData.ultimateBeneficialOwner}
                      onChange={(e) => handleInputChange('ultimateBeneficialOwner', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      rows={3}
                      placeholder="Enter ultimate beneficial owner details"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Source of Funds
                    </label>
                    <input
                      type="text"
                      value={formData.sourceOfFunds}
                      onChange={(e) => handleInputChange('sourceOfFunds', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter source of funds"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UBO/Shareholders source of accumulated wealth
                    </label>
                    <input
                      type="text"
                      value={formData.shareholdersSourceOfWealth}
                      onChange={(e) => handleInputChange('shareholdersSourceOfWealth', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter source of accumulated wealth"
                    />
                  </div>
                  
                  <div className="lg:col-span-2">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      UBO/Shareholders Nationality/Country of Residence
                    </label>
                    <input
                      type="text"
                      value={formData.shareholdersNationalityCountry}
                      onChange={(e) => handleInputChange('shareholdersNationalityCountry', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter nationality/country of residence"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="bg-white rounded-lg shadow-sm overflow-hidden">
            <button
              type="button"
              onClick={() => toggleSection('uboDeclarationSection')}
              className="w-full bg-red-600 text-white px-6 py-3 flex justify-between items-center focus:outline-none"
            >
              <h2 className="text-lg font-semibold">DECLARATION OF ULTIMATE BENEFICIAL OWNERSHIP (UBO)</h2>
              {sectionsOpen.uboDeclarationSection ? (
                <ChevronUp className="w-5 h-5" />
              ) : (
                <ChevronDown className="w-5 h-5" />
              )}
            </button>
            
            {sectionsOpen.uboDeclarationSection && (
              <div className="p-6 space-y-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-2">
                    <input
                      type="checkbox"
                      id="confirmation"
                      checked={formData.confirmationChecked}
                      onChange={(e) => handleInputChange('confirmationChecked', e.target.checked)}
                      className="mt-1 rounded border-gray-300 text-red-600 focus:ring-red-500"
                    />
                    <label htmlFor="confirmation" className="text-sm text-gray-700 leading-relaxed">
                      <strong>We confirm that: (Tick one of the relevant boxes):</strong>
                    </label>
                  </div>
                  
                  <div className="ml-6 space-y-2 text-sm text-gray-700">
                    <p>The natural person(s) listed in the table below is/are the Beneficial Owner(s) who exercise(s) ultimate control over the above named entity.</p>
                    <p>The natural person(s) listed in the table below is/are the Senior Managing Official(s) who exercise(s) ultimate control over the above named entity.</p>
                    <p>We undertake to notify Bank One Limited, without delay, of any changes impacting the Beneficial Ownership and/or the Senior Managing Officials of the above-named entity.</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <h4 className="font-medium text-gray-900">Ultimate Beneficial Owners / Senior Managing Officials</h4>
                    <button
                      type="button"
                      onClick={addUBOPerson}
                      className="flex items-center space-x-1 text-red-600 hover:text-red-700"
                    >
                      <Plus className="w-4 h-4" />
                      <span className="text-sm">Add Person</span>
                    </button>
                  </div>
                  
                  <div className="overflow-x-auto">
                    <table className="w-full border-collapse border border-gray-300">
                      <thead>
                        <tr className="bg-gray-100">
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Full Name</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Nationality</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Residential Address</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">NIC/Passport No</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Controlling Ownership Interest (%)</th>
                          <th className="border border-gray-300 px-3 py-2 text-left text-sm font-medium">Action</th>
                        </tr>
                      </thead>
                      <tbody>
                        {formData.uboPersons.map((person, index) => (
                          <tr key={index}>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={person.fullName}
                                onChange={(e) => updateUBOPerson(index, 'fullName', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Full name"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={person.nationality}
                                onChange={(e) => updateUBOPerson(index, 'nationality', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Nationality"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={person.residentialAddress}
                                onChange={(e) => updateUBOPerson(index, 'residentialAddress', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="Address"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="text"
                                value={person.nicPassport}
                                onChange={(e) => updateUBOPerson(index, 'nicPassport', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="NIC/Passport"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1">
                              <input
                                type="number"
                                value={person.controllingOwnershipInterest}
                                onChange={(e) => updateUBOPerson(index, 'controllingOwnershipInterest', e.target.value)}
                                className="w-full px-2 py-1 border border-gray-300 rounded focus:outline-none focus:ring-1 focus:ring-red-500"
                                placeholder="%"
                                min="0"
                                max="100"
                              />
                            </td>
                            <td className="border border-gray-300 px-2 py-1 text-center">
                              <button
                                type="button"
                                onClick={() => removeUBOPerson(index)}
                                className="text-red-600 hover:text-red-700"
                              >
                                <Minus className="w-4 h-4" />
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  
                  {formData.uboPersons.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      <p>No UBO persons added yet.</p>
                      <button
                        type="button"
                        onClick={addUBOPerson}
                        className="mt-2 text-red-600 hover:text-red-700 font-medium"
                      >
                        Add the first person
                      </button>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={onBack}
              className="bg-gray-400 hover:bg-gray-500 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Previous
            </button>
            <button
              type="button"
              onClick={onNext}
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Next
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default DocumentsUBOForm;